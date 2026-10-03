"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, MessageCircle, Pencil, Phone, ShieldCheck } from "lucide-react";
import { clinic, services } from "@/lib/clinic";

function localDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

type RequestDetails = { name: string; phone: string; service: string; date: string; time: string };

export function AppointmentForm() {
  const params = useSearchParams();
  const selectedService = params.get("service");
  const service = services.find((item) => item === selectedService) ?? services[0];
  const [details, setDetails] = useState<RequestDetails | null>(null);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (details) resultRef.current?.focus(); }, [details]);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const date = String(data.get("date") ?? "");
    if (name.length < 2) return setError("Please enter your full name.");
    if (!/^\+?[\d\s()-]{10,20}$/.test(phone) || phone.replace(/\D/g, "").length < 10 || phone.replace(/\D/g, "").length > 15) return setError("Please enter a valid phone number with 10–15 digits.");
    if (date < localDate()) return setError("Please choose today or a future date.");
    setDetails({ name, phone, date, service: String(data.get("service")), time: String(data.get("time")) });
  }

  const message = details ? `Hello Jivan Urja, I would like to request a consultation.\n\nName: ${details.name}\nPhone: ${details.phone}\nCare: ${details.service}\nPreferred date: ${details.date}\nPreferred time: ${details.time}\n\nPlease confirm availability. Thank you.` : "";

  return <div className="appointment-card">
    <div className="mb-7 flex items-center gap-3"><span className="step-badge">{details ? "02" : "01"}</span><div><h3 className="text-xl font-semibold">{details ? "Review your request" : "Your first step starts here"}</h3><p className="mt-1 text-xs text-muted">{details ? "Then send it to our clinic on WhatsApp" : "Tell us when you’d like to visit"}</p></div></div>
    <form onSubmit={prepare} hidden={details !== null} className="space-y-5">
      <div><label htmlFor="full-name">Full name <span aria-hidden="true">*</span></label><input id="full-name" name="name" autoComplete="name" placeholder="Your full name" required minLength={2} maxLength={80} /></div>
      <div><label htmlFor="phone-number">Phone number <span aria-hidden="true">*</span></label><input id="phone-number" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required maxLength={20} /></div>
      <div><label htmlFor="service">I’d like to discuss</label><select key={service} id="service" name="service" defaultValue={service}>{services.map((item) => <option key={item}>{item}</option>)}</select></div>
      <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="preferred-date">Preferred date <span aria-hidden="true">*</span></label><input id="preferred-date" name="date" type="date" required min={localDate()} onFocus={(event) => { event.currentTarget.min = localDate(); }} /></div><div><label htmlFor="preferred-time">Preferred time</label><select id="preferred-time" name="time"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div></div>
      <label className="consent"><input type="checkbox" required name="consent" /><span>I agree to share these details with Jivan Urja through WhatsApp so the clinic can contact me about my request.</span></label>
      {error && <p role="alert" className="form-error">{error}</p>}
      <button type="submit" className="button button-dark w-full justify-between">Review consultation request <ArrowUpRight size={18} /></button>
      <p className="text-center text-xs leading-5 text-muted">Your preferred time is subject to confirmation by the clinic.</p>
    </form>
    {details && <div ref={resultRef} tabIndex={-1} className="request-review"><div className="mb-5 flex items-center gap-2 text-sm font-semibold"><Check size={18} /> Ready to send — no message sent yet</div><dl className="review-details">{[["Name", details.name], ["Phone", details.phone], ["Care", details.service], ["Preferred date", details.date], ["Time", details.time]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a className="button button-dark mt-6 w-full" href={`${clinic.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Continue to WhatsApp <ArrowUpRight size={17} /></a><p className="mt-3 text-xs leading-6 text-muted">WhatsApp opens with your message ready. Tap Send there to submit your request. Your appointment is confirmed only when the clinic replies.</p><button type="button" className="text-link mt-5 text-sm" onClick={() => { setDetails(null); setTimeout(() => document.getElementById("full-name")?.focus(), 0); }}><Pencil size={14} /> Edit details</button><a href={`tel:${clinic.phone}`} className="text-link mt-4 text-sm"><Phone size={14} /> Prefer to call? {clinic.displayPhone}</a></div>}
    <div className="mt-6 flex items-center justify-center gap-2 border-t border-line pt-5 text-[11px] text-muted"><ShieldCheck size={14} /> Your details stay in this page until you choose to share.</div>
  </div>;
}
