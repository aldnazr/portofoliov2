/**
 * Runnable validation script for Next.js rendering strategies demo.
 * Run against a running production server (e.g. `bun run scripts/check-rendering.ts [baseUrl]`).
 */

const baseUrl = process.argv[2] || "http://localhost:3000";

function extractTimestamp(html: string): string {
  const match = html.match(/data-demo-timestamp[^>]*>([^<]+)<\/time>/);
  if (!match || !match[1]) {
    throw new Error("Gagal menemukan elemen data-demo-timestamp dalam HTML");
  }
  return match[1].trim();
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log(`[check-rendering] Testing against ${baseUrl}...`);

  // 1. API /api/time check
  console.log("1. Checking GET /api/time...");
  const apiRes1 = await fetch(`${baseUrl}/api/time`, { cache: "no-store" });
  if (!apiRes1.ok) throw new Error(`API returned HTTP ${apiRes1.status}`);
  const cacheControl = apiRes1.headers.get("cache-control") || "";
  if (!cacheControl.includes("no-store")) {
    throw new Error(`Expected Cache-Control: no-store, got: ${cacheControl}`);
  }
  const apiBody1 = (await apiRes1.json()) as { generatedAt?: string };
  if (!apiBody1.generatedAt || Number.isNaN(Date.parse(apiBody1.generatedAt))) {
    throw new Error(`Invalid generatedAt timestamp: ${apiBody1.generatedAt}`);
  }
  await sleep(50);
  const apiRes2 = await fetch(`${baseUrl}/api/time`, { cache: "no-store" });
  const apiBody2 = (await apiRes2.json()) as { generatedAt?: string };
  if (apiBody1.generatedAt === apiBody2.generatedAt) {
    throw new Error("API time did not change between requests");
  }
  console.log("  ✓ API /api/time non-cached and returning dynamic timestamps");

  // 2. SSR check (/learns/rendering/ssr)
  console.log("2. Checking SSR (/learns/rendering/ssr)...");
  const ssrRes1 = await fetch(`${baseUrl}/learns/rendering/ssr`, { cache: "no-store" });
  if (!ssrRes1.ok) throw new Error(`SSR returned HTTP ${ssrRes1.status}`);
  const ssrTs1 = extractTimestamp(await ssrRes1.text());

  await sleep(50);
  const ssrRes2 = await fetch(`${baseUrl}/learns/rendering/ssr`, { cache: "no-store" });
  const ssrTs2 = extractTimestamp(await ssrRes2.text());

  if (ssrTs1 === ssrTs2) {
    throw new Error(`SSR timestamp did not change between requests: ${ssrTs1}`);
  }
  console.log(`  ✓ SSR timestamps differ (${ssrTs1} vs ${ssrTs2})`);

  // 3. SSG check (/learns/rendering/ssg)
  console.log("3. Checking SSG (/learns/rendering/ssg)...");
  const ssgRes1 = await fetch(`${baseUrl}/learns/rendering/ssg`);
  if (!ssgRes1.ok) throw new Error(`SSG returned HTTP ${ssgRes1.status}`);
  const ssgTs1 = extractTimestamp(await ssgRes1.text());

  await sleep(50);
  const ssgRes2 = await fetch(`${baseUrl}/learns/rendering/ssg`);
  const ssgTs2 = extractTimestamp(await ssgRes2.text());

  if (ssgTs1 !== ssgTs2) {
    throw new Error(`SSG timestamp changed unexpectedly: ${ssgTs1} vs ${ssgTs2}`);
  }
  console.log(`  ✓ SSG timestamp stable (${ssgTs1})`);

  // 4. ISR check (/learns/rendering/isr)
  console.log("4. Checking ISR (/learns/rendering/isr)...");
  const isrRes1 = await fetch(`${baseUrl}/learns/rendering/isr`);
  if (!isrRes1.ok) throw new Error(`ISR returned HTTP ${isrRes1.status}`);
  const isrTs1 = extractTimestamp(await isrRes1.text());
  console.log(`   Initial ISR timestamp: ${isrTs1}. Waiting 10.5s for revalidation window...`);

  await sleep(10500);

  // Trigger revalidation request
  await fetch(`${baseUrl}/learns/rendering/isr`);

  // Bounded retry to get the regenerated page
  let isrTs2 = isrTs1;
  for (let attempt = 1; attempt <= 5; attempt++) {
    await sleep(500);
    const res = await fetch(`${baseUrl}/learns/rendering/isr`);
    const ts = extractTimestamp(await res.text());
    if (ts !== isrTs1) {
      isrTs2 = ts;
      break;
    }
  }

  if (isrTs1 === isrTs2) {
    throw new Error("ISR timestamp did not update after 10s revalidation window");
  }
  console.log(`  ✓ ISR timestamp successfully revalidated (${isrTs1} -> ${isrTs2})`);

  console.log("\n[check-rendering] All rendering strategy checks passed successfully!");
}

run().catch((err) => {
  console.error("\n[check-rendering] FAILED:", err.message);
  process.exit(1);
});
