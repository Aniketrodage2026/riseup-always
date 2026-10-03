"use client";

import Link from "next/link";
import { ArrowRight, Check, Footprints, MoveUpRight, Activity, CircleHelp, RotateCcw } from "lucide-react";
import { useState } from "react";

const concerns = [
  { title: "Everyday knee discomfort", detail: "Walking or daily movement feels difficult", icon: Footprints, service: "Knee joint care" },
  { title: "Stiffness or limited movement", detail: "Getting up or using stairs feels harder", icon: MoveUpRight, service: "Knee joint care" },
  { title: "Meniscus or ligament concern", detail: "I want to discuss an existing concern", icon: Activity, service: "Initial consultation" },
  { title: "I’m not sure where to start", detail: "I’d like to speak with a practitioner", icon: CircleHelp, service: "Initial consultation" },
];

export function CareFinder() {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  return <section id="care-guide" className="section-space bg-sage/40">
    <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
      <div><p className="eyebrow">LET’S FIND YOUR FIRST STEP</p><h2 className="section-title mt-5">What’s holding<br />you back?</h2><p className="mt-5 max-w-md text-muted leading-8">You don’t need to know the medical name. Start with what you’re experiencing, and we’ll help you prepare for a conversation.</p><div className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 text-xs text-muted"><span className="status-dot" /> A simple starting point. No diagnosis.</div></div>
      <div className="care-finder">
        {showResult && selected !== null ? <div className="result-panel" role="status"><span className="result-icon"><Check /></span><p className="eyebrow mt-6">YOUR NEXT STEP</p><h3 className="mt-3 text-3xl">Let’s talk about your knee.</h3><p className="mt-4 leading-7 text-muted">You selected <strong>{concerns[selected].title.toLowerCase()}</strong>. Start with a consultation so a practitioner can listen to your concerns and assess which care is appropriate.</p><Link className="button button-dark mt-7" href={`/?service=${encodeURIComponent(concerns[selected].service)}#consultation`}>Prepare your consultation <ArrowRight size={17} /></Link><button className="text-link mt-5 text-sm" onClick={() => { setShowResult(false); setSelected(null); }}><RotateCcw size={14} /> Choose a different concern</button></div> : <><div className="mb-5 flex items-center justify-between"><h3 className="font-semibold">Which sounds most like you?</h3><span className="text-xs text-muted">Choose one</span></div><div className="grid gap-3" role="group" aria-label="Your knee concern">{concerns.map((item, index) => { const Icon = item.icon; return <button key={item.title} className={`concern-option ${selected === index ? "selected" : ""}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><Icon className="shrink-0" size={22} strokeWidth={1.5} /><span className="flex-1 text-left"><strong className="block text-sm">{item.title}</strong><span className="mt-1 block text-xs text-muted">{item.detail}</span></span><span className="choice-circle">{selected === index && <Check size={12} />}</span></button>; })}</div><button disabled={selected === null} className="button button-dark mt-5 w-full justify-between" onClick={() => setShowResult(true)}>See my next step <ArrowRight size={17} /></button></>}
      </div>
    </div>
  </section>;
}
