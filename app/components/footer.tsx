import { profile } from "@/app/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs font-mono text-zinc-500">
      <p>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}
