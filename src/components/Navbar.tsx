
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartCount from "@/components/CartCount";
import BrandLogo from "@/components/BrandLogo";

export default function Navbar() {
  return (
    <>
      <AnnouncementBar />

      <header className="site-header site-header-floating">
        <div className="nav-pill">
          <details className="nav-mobile-menu">
            <summary aria-label="Open navigation menu">
              <span />
              <span />
            </summary>

            <nav className="nav-mobile-panel" aria-label="Mobile navigation">
              <Link href="/">Home</Link>
              <Link href="/collections">Collections</Link>
              <Link href="/search">Discover</Link>
            </nav>
          </details>

          <BrandLogo />

          <nav className="nav-pill-links" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/search">Discover</Link>
          </nav>

          <div className="nav-pill-actions">
            <Link href="/search" className="nav-search">
              Search
            </Link>

            <Link href="/cart" className="nav-bag">
              Bag <span className="nav-cart-count"><CartCount /></span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
