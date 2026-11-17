import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartCount from "@/components/CartCount";

export default function Navbar() {
  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span></span><span></span></summary>
          <nav className="mobile-menu-panel">
            <Link href="/">Home</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/search">Discover</Link>
          </nav>
        </details>
        <nav className="desktop-nav">
          <Link href="/collections">Collections</Link>
          <Link href="/search">Discover</Link>
        </nav>
        <Link href="/" className="wordmark" aria-label="House of Aathvya home">
          <span>HOUSE OF</span>
          <strong>AATHVYA</strong>
        </Link>
        <div className="header-actions">
          <Link href="/search" className="header-text-link">Search</Link>
          <Link href="/cart" className="bag-link">Bag <CartCount /></Link>
        </div>
      </header>
    </>
  );
}
