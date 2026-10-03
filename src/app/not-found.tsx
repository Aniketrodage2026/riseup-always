import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="container flex min-h-screen flex-col items-start justify-center"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1 className="section-title mt-5">Let’s get you<br />back on your path.</h1><p className="mt-5 text-muted">This page may have moved, or the address may be incorrect.</p><Link href="/" className="button button-dark mt-8"><ArrowLeft size={17} /> Back to Jivan Urja</Link></main>;
}
