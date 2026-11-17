
import Link from "next/link";

const BRAND = {
  logoSrc: "",
  eyebrow: "HOUSE OF",
  wordmark: "AATHVYA",
  imageAlt: "House of Aathvya",
};

export default function BrandLogo() {
  return (
    <Link href="/" className="nav-brand" aria-label="House of Aathvya home">
      {BRAND.logoSrc ? (
        <img
          src={BRAND.logoSrc}
          alt={BRAND.imageAlt}
          className="nav-brand-image"
        />
      ) : (
        <>
          <span>{BRAND.eyebrow}</span>
          <strong>{BRAND.wordmark}</strong>
        </>
      )}
    </Link>
  );
}
