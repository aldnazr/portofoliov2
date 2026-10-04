import type { LearnConcept } from "./types";

export const zustandConcepts: LearnConcept[] = [
  {
    id: "zustand-store",
    title: "Membuat Store",
    meta: "create()",
    description:
      "Store dibuat sekali dengan create() lalu berdiri sebagai singleton global: state dan action berada di satu objek yang sama, diekspor sebagai hook, dan bisa dipakai komponen mana pun tanpa prop drilling atau context provider. Action mengubah state lewat set, yang menggabungkan state lama dengan nilai baru, jadi cukup sebutkan field yang berubah. Karena isinya berlaku untuk seluruh aplikasi, simpan di sini state global seperti sesi, tema, atau keranjang, bukan state lokal satu layar. Padanan di Riverpod: provider hasil build_runner.",
    filename: "session-store.ts",
    language: "typescript",
    code: `import { create } from "zustand";

interface SessionState {
  open: boolean;
  showSessionExpired: () => void;
  hideSessionExpired: () => void;
}

// satu store singleton untuk seluruh aplikasi
export const useSessionStore = create<SessionState>()((set) => ({
  open: false,
  // set menggabungkan state lama dengan nilai baru (merge parsial)
  showSessionExpired: () => set({ open: true }),
  hideSessionExpired: () => set({ open: false }),
}));
`,
  },
  {
    id: "zustand-subscribe",
    title: "Subscribe",
    meta: "useStore(selector)",
    description:
      "Hook useStore dengan selector adalah cara subscribe: komponen membaca satu potongan state lalu re-render hanya saat nilai itu berubah. Action yang diambil lewat selector juga punya referensi stabil sehingga tidak memicu re-render. Panggilan tanpa selector men-subscribe ke seluruh store, komponen ikut re-render untuk perubahan apa pun, jadi hindari cara itu di komponen yang merender banyak. Di Zustand v5, selector yang mengembalikan object atau array baru wajib dibungkus useShallow, kalau tidak bisa terjadi infinite loop. Padanan di Riverpod: ref.watch dengan .select.",
    filename: "session-banner.tsx",
    language: "tsx",
    code: `import { useSessionStore } from "./session-store";

export function SessionBanner() {
  // selector: re-render hanya saat \`open\` berubah
  const open = useSessionStore((s) => s.open);

  // action: referensinya stabil, tidak memicu re-render
  const hide = useSessionStore((s) => s.hideSessionExpired);

  if (!open) return null;

  return (
    <div role="alert">
      Sesi berakhir.
      <button onClick={hide}>Masuk kembali</button>
    </div>
  );
}
`,
    examples: [
      {
        filename: "use-shallow.ts",
        language: "typescript",
        code: `import { useShallow } from "zustand/react/shallow";
import { useSessionStore } from "./session-store";

// butuh beberapa nilai sekaligus, tetap pakai selector yang dibungkus useShallow
const { open, hideSessionExpired } = useSessionStore(
  useShallow((s) => ({ open: s.open, hideSessionExpired: s.hideSessionExpired })),
);

// tanpa selector: subscribe ke seluruh store, re-render untuk perubahan apa pun
// const { open } = useSessionStore();
`,
      },
    ],
  },
  {
    id: "zustand-read",
    title: "Baca Sekali",
    meta: "getState()",
    description:
      "getState() mengambil snapshot state saat itu juga, tanpa subscribe dan tanpa memicu re-render, jadi bisa dipanggil dari mana saja: di event handler, function biasa, atau di luar komponen. Nilainya hanya dipakai sekali; kalau ditampilkan di JSX, UI tidak akan mengikuti perubahan berikutnya, jadi untuk nilai di layar tetap pakai hook useStore(selector). Untuk fungsi jangan lupa tanda kurung, getState().hideSessionExpired hanya mengambil referensi dan fungsinya tidak jalan. Padanan di Riverpod: ref.read.",
    filename: "retry-handler.ts",
    language: "typescript",
    code: `import { useSessionStore } from "./session-store";

// di event handler: baca state terbaru tanpa subscribe
const handleRetry = () => {
  if (useSessionStore.getState().open) return; // dialog masih tampil
  // lanjutkan proses...
};
`,
    examples: [
      {
        filename: "session-utils.ts",
        language: "typescript",
        code: `import { useSessionStore } from "./session-store";

// di luar komponen: snapshot state bisa dibaca kapan saja
export function isDialogOpen() {
  return useSessionStore.getState().open;
}
`,
      },
    ],
  },
  {
    id: "zustand-write",
    title: "Ubah State",
    meta: "setState()",
    description:
      "setState() mengubah state dengan menggabungkannya ke state lama (merge parsial), memberi tahu semua subscriber, lalu selesai; pemanggilnya sendiri tidak subscribe. Pakai bentuk updater kalau nilai baru dihitung dari state sebelumnya. Argumen true di posisi kedua mengganti seluruh state alih-alih menggabungkan, sehingga action ikut hilang kalau tidak disertakan; untuk logika aplikasi, utamakan action yang didefinisikan di dalam store. Padanan di Riverpod: method action di notifier.",
    filename: "session-controls.ts",
    language: "typescript",
    code: `import { useSessionStore } from "./session-store";

// merge parsial: hanya field yang disebut yang ikut berubah
useSessionStore.setState({ open: true });

// bentuk updater: nilai baru dihitung dari state sebelumnya
useSessionStore.setState((s) => ({ open: !s.open }));

// argumen true di posisi kedua: seluruh state diganti, bukan digabungkan,
// jadi action ikut hilang kalau tidak disertakan
// useSessionStore.setState({ open: true }, true);
`,
    examples: [
      {
        filename: "session-store.test.ts",
        language: "typescript",
        code: `// reset state di test
beforeEach(() => {
  useSessionStore.setState({ open: false });
});
`,
      },
    ],
  },
  {
    id: "zustand-listen",
    title: "Listener",
    meta: "subscribe()",
    description:
      "subscribe() mendaftarkan listener yang dipanggil setiap kali state berubah sampai fungsi unsubscribe dipanggil. Ini bukan sekali panggil, tetapi tetap tidak memicu re-render, jadi cocok untuk side effect di luar React: analytics, logging, sinkronisasi. Di dalam komponen, bungkus subscribe() di useEffect dan kembalikan unsubscribe sebagai cleanup supaya listener ikut dilepas saat komponen dilepas. Middleware subscribeWithSelector memberi selector supaya listener hanya jalan saat satu field berubah. Padanan di Riverpod: ref.listen.",
    filename: "session-analytics.ts",
    language: "typescript",
    code: `import { useSessionStore } from "./session-store";

// listener dipanggil setiap state berubah sampai unsubscribe() dipanggil
const unsubscribe = useSessionStore.subscribe((state, prevState) => {
  if (!prevState.open && state.open) {
    console.log("session_expired"); // analytics / logging
  }
});

unsubscribe(); // berhenti listen
`,
    examples: [
      {
        filename: "session-banner.tsx",
        language: "tsx",
        code: `// di dalam komponen: unsubscribe dikembalikan sebagai cleanup
useEffect(() => {
  return useSessionStore.subscribe((state, prev) => {
    if (state.open && !prev.open) console.log("session_expired");
  });
}, []);
`,
      },
      {
        filename: "subscribe-selector.ts",
        language: "typescript",
        code: `import { subscribeWithSelector } from "zustand/middleware";

// store dibungkus middleware:
// create<SessionState>()(subscribeWithSelector((set) => ({ ... })))

useSessionStore.subscribe(
  (s) => s.open, // selector: listener hanya jalan saat \`open\` berubah
  (open) => {
    if (open) console.log("session_expired");
  },
);
`,
      },
    ],
  },
];

