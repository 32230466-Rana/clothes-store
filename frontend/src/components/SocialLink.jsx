function SocialLink({ href, label, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="social-circle"
    >
      {label}
    </a>
  );
}

export default SocialLink;
