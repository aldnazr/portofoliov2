"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
  type SVGProps,
} from "react";
import { profile } from "@/data/profile.ts";
import { Button } from "../button/button";

type FieldName = "name" | "email" | "message";
type FieldElement = HTMLInputElement | HTMLTextAreaElement;
type FieldErrors = Partial<Record<FieldName, string>>;
type IconProps = SVGProps<SVGSVGElement>;

const FIELD_NAMES: FieldName[] = ["name", "email", "message"];

const FIELD_LABELS: Record<FieldName, string> = {
  name: "Nama",
  email: "Email",
  message: "Pesan",
};

const CONTROL_CLASS =
  "block w-full rounded-xl border border-hairline bg-overlay px-4 py-3 text-base text-foreground placeholder:text-muted transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-foreground/30 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong read-only:opacity-70 aria-invalid:border-danger";
const INPUT_CLASS = `${CONTROL_CLASS} min-h-12`;
const TEXTAREA_CLASS = `${CONTROL_CLASS} field-sizing-content min-h-[calc(4lh+1.5rem)] max-h-[calc(10lh+1.5rem)] resize-y`;

function getFieldError(el: FieldElement): string | undefined {
  if (el.name === "message" && !el.value.trim()) {
    return "Tulis pesan Anda sebelum mengirim.";
  }
  if (el.name === "email" && el.validity.typeMismatch) {
    return "Format email belum sesuai. Contoh: nama@domain.com";
  }
  return undefined;
}

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function IconSend(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" />
    </Icon>
  );
}

function IconCopy(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </Icon>
  );
}

function IconCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icon>
  );
}

function IconAlert(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 16.25h.01" />
    </Icon>
  );
}

function IconSpinner(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" className="opacity-25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </Icon>
  );
}

function Field({
  htmlFor,
  label,
  note,
  error,
  children,
}: {
  htmlFor: string;
  label: string;
  note: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label} <span className="font-normal text-muted">({note})</span>
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="mt-2 flex items-start gap-1.5 text-sm text-danger"
        >
          <IconAlert className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const uid = useId();
  const headingId = `${uid}-heading`;
  const fieldId = (name: FieldName) => `${uid}-${name}`;

  const shellRef = useRef<HTMLDivElement>(null);
  const dirtyFields = useRef(new Set<FieldName>());
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const announceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const el = shellRef.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      delete el.dataset.reveal;
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(copyTimer.current);
      clearTimeout(announceTimer.current);
    };
  }, []);

  const announce = (text: string, delay = 100) => {
    clearTimeout(announceTimer.current);
    setAnnouncement("");
    announceTimer.current = setTimeout(() => setAnnouncement(text), delay);
  };

  const handleChange = (e: ChangeEvent<FieldElement>) => {
    const name = e.target.name as FieldName;
    const { value } = e.target;

    dirtyFields.current.add(name);
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name] && !getFieldError(e.target)) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: FocusEvent<FieldElement>) => {
    const name = e.target.name as FieldName;
    if (!dirtyFields.current.has(name)) return;

    const message = getFieldError(e.target);
    setErrors((prev) =>
      prev[name] === message ? prev : { ...prev, [name]: message },
    );
    if (message) announce(`${FIELD_LABELS[name]}: ${message}`, 500);
  };

  const handleCopyEmail = async () => {
    clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
      announce("Email tersalin ke clipboard.");
    } catch {
      setCopyState("failed");
      announce("Gagal menyalin email. Salin manual dari teks email.");
    }
    copyTimer.current = setTimeout(() => setCopyState("idle"), 2000);
  };

  const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    const nextErrors: FieldErrors = {};
    let firstInvalid: FieldElement | null = null;
    for (const name of FIELD_NAMES) {
      const el = e.currentTarget.elements.namedItem(
        name,
      ) as FieldElement | null;
      const message = el ? getFieldError(el) : undefined;
      if (el && message) {
        nextErrors[name] = message;
        if (!firstInvalid) firstInvalid = el;
      }
    }
    setErrors(nextErrors);
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    setIsSending(true);
    setSendStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Gagal mengirim email");
      }

      setSendStatus("success");
      setFormData({ name: "", email: "", message: "" });
      dirtyFields.current.clear();
      announce("Pesan berhasil terkirim.");
    } catch (err) {
      const detail =
        err instanceof TypeError
          ? "Periksa koneksi internet Anda"
          : (err as Error).message;
      setSendStatus("error");
      setErrorMessage(detail);
      announce(`Pesan belum terkirim. ${detail}.`);
    } finally {
      setIsSending(false);
    }
  };

  const controlProps = (name: FieldName) => ({
    id: fieldId(name),
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    readOnly: isSending,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${fieldId(name)}-error` : undefined,
  });

  const copyLabel =
    copyState === "copied"
      ? "Tersalin"
      : copyState === "failed"
        ? "Gagal"
        : "Salin";
  const copyTone =
    copyState === "copied"
      ? "text-accent-strong"
      : copyState === "failed"
        ? "text-danger"
        : "text-foreground";

  return (
    <section
      id="contact"
      aria-labelledby={headingId}
      className="px-4 sm:px-6 mx-auto max-w-6xl scroll-mt-30 sm:scroll-mt-36"
    >
      <div
        ref={shellRef}
        className="p-1.5 rounded-[2.5rem] border border-accent-wash-border bg-linear-to-b from-accent-wash via-overlay-faint to-transparent motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:data-[reveal=hidden]:translate-y-8 motion-safe:data-[reveal=hidden]:opacity-0"
      >
        <div className="grid gap-10 rounded-[2.125rem] border border-hairline-soft bg-surface p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16 lg:p-14">
          <div>
            <h2
              id={headingId}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-balance text-foreground"
            >
              Punya ide proyek atau peluang kerja sama?
            </h2>
            <p className="mt-5 max-w-md text-base sm:text-lg text-pretty text-muted">
              Kirim pesan langsung kepada saya melalui formulir ini atau salin
              email saya.
            </p>
          </div>

          <div className="min-w-0">
            <form noValidate onSubmit={handleSendEmail} className="space-y-5">
              <Field
                htmlFor={fieldId("name")}
                label="Nama"
                note="opsional"
                error={errors.name}
              >
                <input
                  type="text"
                  autoComplete="name"
                  enterKeyHint="next"
                  placeholder="Nama lengkap"
                  className={INPUT_CLASS}
                  {...controlProps("name")}
                />
              </Field>

              <Field
                htmlFor={fieldId("email")}
                label="Email"
                note="opsional, isi bila ingin dibalas"
                error={errors.email}
              >
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="next"
                  placeholder="nama@domain.com"
                  className={INPUT_CLASS}
                  {...controlProps("email")}
                />
              </Field>

              <Field
                htmlFor={fieldId("message")}
                label="Pesan"
                note="wajib diisi"
                error={errors.message}
              >
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan proyek, kebutuhan, atau peluangnya"
                  className={TEXTAREA_CLASS}
                  {...controlProps("message")}
                />
              </Field>

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={isSending}
                  className="group w-full cursor-pointer disabled:cursor-not-allowed sm:w-auto"
                >
                  <span>
                    {isSending ? "Mengirim..." : "Kirim Pesan Langsung"}
                  </span>
                  <span className="flex size-6 items-center justify-center rounded-full bg-on-primary-wash transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-px">
                    {isSending ? (
                      <IconSpinner className="size-3.5 motion-safe:animate-spin" />
                    ) : (
                      <IconSend className="size-3.5" />
                    )}
                  </span>
                </Button>
              </div>

              {sendStatus === "success" && (
                <div className="flex items-start gap-2.5 rounded-xl border border-accent-wash-border bg-accent-wash p-3.5 text-sm font-medium text-accent-strong">
                  <IconCheck className="mt-0.5 size-4 shrink-0" />
                  <span>
                    Pesan berhasil terkirim. Terima kasih telah menghubungi.
                  </span>
                </div>
              )}

              {sendStatus === "error" && (
                <div className="flex items-start gap-2.5 rounded-xl border border-danger-border bg-danger-wash p-3.5 text-sm font-medium text-danger">
                  <IconAlert className="mt-0.5 size-4 shrink-0" />
                  <span>
                    Pesan belum terkirim ({errorMessage}). Coba lagi, atau tulis
                    langsung ke email saya.
                  </span>
                </div>
              )}
            </form>

            <div className="mt-8 border-t border-hairline-soft pt-6">
              <p className="text-sm text-muted">
                Atau tulis langsung ke email saya
              </p>
              <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-hairline bg-overlay py-1.5 pl-4 pr-1.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="min-w-0 truncate rounded py-2.5 text-base text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-[background-color,color,scale] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong motion-safe:active:scale-[0.97] ${copyTone}`}
                >
                  {copyState === "copied" ? (
                    <IconCheck className="size-4" />
                  ) : (
                    <IconCopy className="size-4" />
                  )}
                  <span>
                    {copyLabel}
                    <span className="sr-only"> email</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div role="status" className="sr-only">
        {announcement}
      </div>
    </section>
  );
}
