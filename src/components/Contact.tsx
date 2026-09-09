"use client";

import { useState, FormEvent } from "react";
import { services } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-plum py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <p className="mb-4 text-sm tracking-[0.2em] text-gold">Work With Me</p>
        <h2 className="mb-6 font-display text-4xl leading-tight text-ivory sm:text-5xl">
          Let&rsquo;s bring your expertise to light.
        </h2>
        <p className="mb-12 max-w-lg text-lg text-ivory-dim">
          Tell me a bit about what you do and what you&rsquo;re trying to
          communicate, and I&rsquo;ll follow up within a couple of days.
        </p>

        {status === "success" ? (
          <div className="border border-gold/40 bg-ink/40 px-8 py-10">
            <p className="font-display text-2xl text-gold-soft">
              Thank you &mdash; your message is in.
            </p>
            <p className="mt-3 text-ivory-dim">
              I&rsquo;ll be in touch soon. In the meantime, feel free to reach
              out on WhatsApp if it&rsquo;s urgent.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="What do you do?" name="role" required />
            <SelectField
              label="Service you're interested in"
              name="service"
              options={services.map((s) => s.name)}
            />
            <div className="sm:col-span-2">
              <TextAreaField
                label="Current content/communication challenge"
                name="challenge"
              />
            </div>
            <div className="sm:col-span-2">
              <TextAreaField label="Desired outcome" name="outcome" />
            </div>
            <div className="sm:col-span-2">
              <Field label="LinkedIn / profile / website link" name="link" />
            </div>

            <div className="sm:col-span-2 mt-4 flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="border border-gold bg-gold px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>
              <a
                href="https://wa.me/000000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-ivory/40 pb-1 text-sm text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                Message on WhatsApp instead
              </a>
            </div>

            {status === "error" && (
              <p className="sm:col-span-2 text-sm text-gold-soft">
                Something went wrong sending that &mdash; please try the
                WhatsApp link above, or email directly.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-ivory-dim">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-ivory outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

function TextAreaField({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-ivory-dim">{label}</span>
      <textarea
        name={name}
        rows={3}
        className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-ivory outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-ivory-dim">{label}</span>
      <select
        name={name}
        className="w-full border border-ivory/20 bg-plum px-4 py-3 text-ivory outline-none transition-colors focus:border-gold"
      >
        <option value="">Select one</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
