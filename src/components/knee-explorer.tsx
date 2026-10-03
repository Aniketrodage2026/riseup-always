"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, MousePointer2 } from "lucide-react";
import { useState } from "react";

const areas = [
  { name: "Knee joint", title: "A little understanding. A better first step.", text: "Your knee brings bones, cartilage and supporting tissues together. A consultation helps your doctor understand your discomfort and its effect on everyday movement.", x: "61%", y: "33%", service: "Knee joint care" },
  { name: "Meniscus", title: "The cushioning within your knee.", text: "The menisci are cushions between the bones of your knee. If you have discomfort, catching or swelling, tell your practitioner when it began and which movements feel difficult.", x: "61%", y: "49%", service: "Meniscus discomfort" },
  { name: "Ligaments", title: "Support for a complex, moving joint.", text: "Ligaments help connect and stabilize the knee. If your knee feels unsteady or your concern followed an injury, discuss this with a qualified clinician before beginning treatment.", x: "49%", y: "43%", service: "Ligament discomfort" },
];

export function KneeExplorer() {
  const [selected, setSelected] = useState(0);
  const area = areas[selected];
  return <section id="knee-care" className="knee-section section-space">
    <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="eyebrow text-sand">UNDERSTAND YOUR KNEE</p>
        <h2 className="section-title mt-5 text-cream">Small joint.<br />Big part of your life.</h2>
        <p className="mt-6 max-w-lg leading-8 text-white/70">A morning walk. A flight of stairs. Sitting down with family. Your knee is part of it all. Let’s get to know it a little better.</p>
        <div className="mt-8 flex flex-wrap gap-2" aria-label="Explore knee structures">{areas.map((item, index) => <button key={item.name} onClick={() => setSelected(index)} aria-pressed={selected === index} className={`area-tab ${selected === index ? "selected" : ""}`}>{item.name}</button>)}</div>
        <div className="explorer-detail" aria-live="polite" aria-atomic="true"><span className="text-xs text-sand">0{selected + 1} / KNEE ANATOMY</span><h3 className="mt-3 text-2xl">{area.title}</h3><p className="mt-3 text-sm leading-7 text-white/70">{area.text}</p></div>
        <Link href={`/?service=${encodeURIComponent(area.service)}#consultation`} className="text-link mt-7 text-sand">Discuss your knee with us <ArrowUpRight size={17} /></Link>
      </div>
      <div className="anatomy-panel">
        <span className="anatomy-caption"><span className="status-dot" /> AN INTERACTIVE LOOK INSIDE</span>
        <div className="relative mx-auto w-full max-w-[440px]">
          <Image src="/images/knee-anatomy.png" alt="Illustration of a knee showing the joint, meniscus and supporting ligaments" width={1008} height={1200} sizes="(max-width: 1024px) 90vw, 440px" className="anatomy-image" />
          {areas.map((item, index) => <button className={`hotspot ${selected === index ? "active" : ""}`} key={item.name} style={{ left: item.x, top: item.y }} aria-label={`Explore ${item.name.toLowerCase()}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><Plus size={17} /><span>{item.name}</span></button>)}
        </div>
        <p className="flex items-center justify-center gap-2 text-xs text-white/65"><MousePointer2 size={14} /> Tap a point to explore · Illustration for education</p>
      </div>
    </div>
  </section>;
}
