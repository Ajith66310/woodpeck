import logoImg from "../../assets/logo/logo-woodpeck.jpg";
import { TbBrandInstagram, TbBrandWhatsapp } from "react-icons/tb";

export function Footer() {
  return (
    <footer className="footer">
      <img src={logoImg} alt="WoodPeck Logo" className="footer-logo-img" />
      <div className="footer-bottom-bar">
        <p className="footer-copy">
          © {new Date().getFullYear()} WoodPeck. All Rights Reserved.
        </p>
        <div className="footer-social-icons">
          {/* Instagram Icon - Outline / Border only from react-icons */}
          <a
            href="https://www.instagram.com/thewoodpeck?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Follow WoodPeck on Instagram"
          >
            <TbBrandInstagram size={17} strokeWidth={1.75} />
          </a>

          {/* WhatsApp Icon - Outline / Border only from react-icons */}
          <a
            href="https://wa.me/918590123072"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Chat with WoodPeck on WhatsApp"
          >
            <TbBrandWhatsapp size={17} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </footer>
  );
}
