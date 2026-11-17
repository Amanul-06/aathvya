import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return <><Navbar /><main className="not-found"><span className="eyebrow">A LITTLE DETOUR</span><h1>This page is <em>not here.</em></h1><p>Let's find something beautiful instead.</p><Link href="/collections" className="button button-dark">EXPLORE COLLECTIONS ↗</Link></main><Footer /></>;
}
