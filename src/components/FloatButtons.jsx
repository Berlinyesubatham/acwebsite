import { FaWhatsapp, FaPhone } from "react-icons/fa";

export default function FloatButtons() {
  return (
    <div className="float-btns">
      <a
        href="https://wa.me/9629535900"
        className="float-btn float-wa"
        target="_blank"
        rel="noreferrer"
        title="WhatsApp Us"
      >
        <FaWhatsapp size={24} color="white" />
      </a>

      <a
        href="tel:+919629535900"
        className="float-btn float-call"
        title="Call Us"
      >
        <FaPhone size={22} color="white" />
      </a>
    </div>
  );
}