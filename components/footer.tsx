import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline-soft py-8 text-center text-xs font-mono text-subtle">
      <p>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}
