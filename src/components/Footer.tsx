import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-kicker">THE ART OF EVERYDAY ELEGANCE</span>
          <Link href="/" className="footer-wordmark">HOUSE OF<br /><strong>AATHVYA</strong></Link>
          <p>Thoughtfully chosen pieces for the moments that make you, you.</p>
        </div>
        <div className="footer-column">
          <h3>EXPLORE</h3>
          <Link href="/collections">All collections</Link>
          <Link href="/search">Discover</Link>
          <Link href="/cart">Your bag</Link>
        </div>
        <div className="footer-column">
          <h3>HOUSE OF AATHVYA</h3>
          <a href="mailto:hello@houseofaathvya.com">Contact us</a>
          <a href="mailto:hello@houseofaathvya.com">Customer care</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} HOUSE OF AATHVYA</span>
        <span>MADE TO BE YOURS</span>
      </div>
    </footer>
  );
}
