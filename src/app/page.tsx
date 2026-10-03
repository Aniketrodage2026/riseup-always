import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Award, Check, ChevronDown, CircleCheck, HeartHandshake, Leaf, MapPin, MessageCircle, Phone, Quote, ShieldCheck, Sprout, Stethoscope } from "lucide-react";
import { Header, Logo } from "@/components/header";
import { KneeExplorer } from "@/components/knee-explorer";
import { CareFinder } from "@/components/care-finder";
import { AppointmentForm } from "@/components/appointment-form";
import { clinic, faqs } from "@/lib/clinic";

const approach = [
  { icon: Stethoscope, title: "Expert hands. A listening ear.", body: "BAMS-qualified doctors take the time to understand your health history and what matters to you." },
  { icon: Sprout, title: "Care made for you.", body: "Your plan brings together Ayurvedic therapies, dietary guidance and lifestyle support suited to your needs." },
  { icon: HeartHandshake, title: "Support at every step.", body: "Follow-up visits help your practitioner review your progress and adjust your care as needed." },
];
const steps = [
  ["We listen", "Share your concerns, health history and the movements you’d like to feel more comfortable with."],
  ["We understand", "Your practitioner assesses your knee and discusses your needs through an Ayurvedic consultation."],
  ["We plan together", "Get an individual plan covering suitable therapies, diet and everyday habits."],
  ["Your care begins", "Attend recommended sessions with trained therapists under doctor supervision."],
  ["We stay with you", "Regular follow-ups give you a chance to ask questions and review your progress."],
];
const stories = [
  { name: "Ramesh Patil", initial: "R", quote: "The personalized care at Jivan Urja has been a turning point for my joint comfort. After 3 months, I can manage my daily movements with much greater ease and flexibility.", tag: "Everyday movement" },
  { name: "Sunita Deshmukh", initial: "S", quote: "I was initially skeptical of traditional methods, but the BAMS doctors here are incredibly knowledgeable. Since starting my protocol at Jivan Urja, my daily knee comfort and mobility have improved remarkably.", tag: "Comfort & mobility" },
  { name: "Anil Kulkarni", initial: "A", quote: "Choosing a non-surgical path with Jivan Urja was a great decision. The BAMS doctors guided me at every step, and I've seen a notable shift in my comfort levels and movement.", tag: "A guided care journey" },
];

export default function Home() {
  return <>
    <Header />
    <main id="main-content">
      <section className="hero">
        <div className="hero-photo"><Image src="/images/knee-care-hero.jpg" alt="An illustration of an Ayurvedic practitioner assessing a patient’s knee" fill preload sizes="100vw" className="object-cover" /><div className="hero-overlay" /></div>
        <div className="container relative z-10">
          <div className="hero-content">
            <p className="hero-eyebrow"><span className="status-dot" /> AYURVEDIC KNEE CARE · PUNE</p>
            <h1>Move with<br />greater comfort.<br /><span>Naturally.</span></h1>
            <p className="hero-description">Get back to the little things that mean everything. Personalized, non-surgical Ayurvedic care for your knees, with you at the heart of it.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#consultation" className="button button-dark button-large">Let’s talk about your knee <ArrowUpRight size={18} /></a><a href="#knee-care" className="button button-outline button-large">Explore knee care <ArrowDown size={16} /></a></div>
            <div className="hero-credentials"><span><ShieldCheck size={17} /> BAMS-qualified doctors</span><span><Leaf size={17} /> Personalized care</span></div>
          </div>
        </div>
        <div className="hero-note"><span className="note-icon"><Leaf size={23} strokeWidth={1.4} /></span><div><strong>Rooted in tradition.<br />Centered on you.</strong><p>Your journey to knee comfort.</p></div></div>
        <div className="hero-bottom container"><span>MORE COMFORT. MORE EVERYDAY MOMENTS.</span><a href="#approach" aria-label="Discover our approach"><ArrowDown size={19} /></a></div>
      </section>

      <div className="trust-strip"><div className="container grid grid-cols-2 gap-y-6 md:grid-cols-4"><div><Award /><span><strong>12+ years</strong><small>of Ayurvedic experience</small></span></div><div><Stethoscope /><span><strong>Qualified practitioners</strong><small>BAMS-qualified doctors</small></span></div><div><Leaf /><span><strong>A personal approach</strong><small>Care shaped around you</small></span></div><div><MapPin /><span><strong>Here in Pune</strong><small>Sadashiv Peth, Pune</small></span></div></div></div>

      <section id="approach" className="section-space intro-section"><div className="container">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-24"><div><p className="eyebrow">WELCOME TO JIVAN URJA</p><h2 className="section-title mt-5">Your life is bigger<br />than your knee pain.</h2></div><div className="lg:pt-9"><p className="text-lg leading-8 text-muted">And your care should see the whole picture. At Jivan Urja Chikitsalaya, we bring Ayurvedic understanding and personal attention to your knee health.</p><p className="mt-4 leading-7 text-muted">From the first conversation to your follow-up, we focus on what matters: your comfort, your movement, and the everyday life you want to enjoy.</p><a href="#process" className="text-link mt-6">Get to know our approach <ArrowUpRight size={17} /></a></div></div>
        <div className="approach-grid">{approach.map(({ icon: Icon, title, body }, index) => <article key={title} className="approach-item"><div className="flex items-center justify-between"><Icon size={27} strokeWidth={1.3} /><span className="text-xs text-muted">0{index + 1}</span></div><h3 className="mt-6 text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{body}</p></article>)}</div>
      </div></section>

      <KneeExplorer />
      <CareFinder />

      <section id="process" className="section-space"><div className="container"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">A CLEAR PATH, AT YOUR PACE</p><h2 className="section-title mt-5">Care is a journey.<br />We walk it with you.</h2></div><p className="max-w-xs leading-7 text-muted">No guesswork about what comes next. Here’s what you can expect at Jivan Urja.</p></div><div className="process-grid">{steps.map(([title, text], index) => <article key={title} className="process-step"><div className="process-number">0{index + 1}</div><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{text}</p></article>)}</div><div className="process-footer"><span><CircleCheck size={18} /> Your care plan is explained before treatment begins.</span><Link href="/knee-treatment-guide" className="text-link text-sm">Read the consultation guide <ArrowUpRight size={16} /></Link></div></div></section>

      <section id="stories" className="stories-section section-space"><div className="container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">PEOPLE. PROGRESS. EVERYDAY LIFE.</p><h2 className="section-title mt-5">Their words.<br />Their journey.</h2></div><p className="max-w-xs text-sm leading-7 text-muted">Experiences shared on the Jivan Urja website. Every person’s care and results are different.</p></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{stories.map((story) => <figure key={story.name} className="story-card"><div className="flex items-center justify-between"><Quote size={28} strokeWidth={1.2} /><span className="story-tag">{story.tag}</span></div><blockquote className="mt-7 flex-1 text-[15px] leading-8">“{story.quote}”</blockquote><figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-6"><span className="avatar">{story.initial}</span><div><strong className="block text-sm font-semibold">{story.name}</strong><span className="text-xs text-muted">Pune, Maharashtra</span></div></figcaption></figure>)}</div></div></section>

      <section id="faq" className="section-space"><div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div><p className="eyebrow">A LITTLE CLARITY HELPS</p><h2 className="section-title mt-5">Good questions.<br />Clear answers.</h2><p className="mt-5 max-w-sm leading-7 text-muted">Making a decision about your health takes thought. We’re here to help you understand your next step.</p><a className="text-link mt-7" href={`${clinic.whatsapp}?text=${encodeURIComponent("Hello Jivan Urja, I have a question about knee care.")}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Ask us on WhatsApp <ArrowUpRight size={16} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} className="faq-item" name="faq" open={index === 0}><summary><span className="faq-number">0{index + 1}</span><span className="flex-1">{question}</span><ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></div></section>

      <section id="consultation" className="consultation-section section-space"><div className="container grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24"><div className="lg:py-8"><p className="eyebrow text-sand">YOUR NEXT CHAPTER STARTS HERE</p><h2 className="section-title mt-5 text-cream">A conversation.<br />A little clarity.<br /><span className="text-sand">A step forward.</span></h2><p className="mt-7 max-w-md leading-8 text-white/75">Tell us what’s on your mind. Our team will help you arrange a consultation and understand what comes next.</p><div className="mt-8 space-y-4 text-sm text-white/85">{["Personal attention from a qualified practitioner", "A chance to discuss your knee and your goals", "A care plan suited to your individual needs"].map((item) => <p className="flex items-start gap-3" key={item}><Check size={17} className="mt-0.5 shrink-0 text-sand" />{item}</p>)}</div><div className="mt-10 border-t border-white/20 pt-7"><p className="text-xs text-white/65">Prefer a conversation over the phone?</p><a href={`tel:${clinic.phone}`} className="mt-3 flex items-center gap-3 text-2xl"><Phone size={22} strokeWidth={1.4} />{clinic.displayPhone}</a></div></div><Suspense fallback={<div className="appointment-card min-h-96" aria-busy="true">Loading consultation form…</div>}><AppointmentForm /></Suspense></div></section>

      <section className="visit-section"><div className="container flex flex-col justify-between gap-7 md:flex-row md:items-center"><div className="flex items-start gap-4"><span className="visit-icon"><MapPin size={25} strokeWidth={1.5} /></span><div><h2 className="text-xl">A little closer to better care.</h2><p className="mt-2 max-w-xl text-sm leading-7 text-muted">{clinic.address}</p></div></div><a href={clinic.maps} className="button button-outline shrink-0" target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={17} /></a></div></section>
    </main>
    <footer className="site-footer"><div className="container"><div className="grid gap-10 border-b border-line pb-10 md:grid-cols-[1.5fr_1fr_1fr]"><div><Logo /><p className="mt-5 max-w-xs text-sm leading-7 text-muted">Ayurvedic care for your knees.<br />Thoughtful support for your everyday life.</p></div><div><h2 className="footer-label">EXPLORE</h2><div className="mt-5 grid gap-3 text-sm"><a href="#knee-care">Knee care</a><a href="#process">Your care journey</a><Link href="/knee-treatment-guide">Consultation guide</Link><a href="#faq">Common questions</a></div></div><div><h2 className="footer-label">LET’S CONNECT</h2><div className="mt-5 grid gap-3 text-sm"><a href={`tel:${clinic.phone}`}>{clinic.displayPhone}</a><a href={`mailto:${clinic.email}`}>{clinic.email}</a><a href={clinic.whatsapp} target="_blank" rel="noopener noreferrer" className="text-link">Chat on WhatsApp <ArrowUpRight size={14} /></a></div></div></div><p className="mt-7 text-xs leading-6 text-muted">Jivan Urja is an Ayurvedic Chikitsalaya offering non-surgical support for joint health. Individual results vary. A qualified healthcare professional should assess your condition before treatment. The clinic does not provide emergency medical services. Images are illustrative.</p><div className="footer-bottom"><span>© {new Date().getFullYear()} Jivan Urja Chikitsalaya</span><span>Made with care. Rooted in Ayurveda.</span></div></div></footer>
    <div className="mobile-contact"><a href={`tel:${clinic.phone}`}><Phone size={17} /> Call the clinic</a><a href="#consultation">Book consultation <ArrowRight size={17} /></a></div>
  </>;
}
