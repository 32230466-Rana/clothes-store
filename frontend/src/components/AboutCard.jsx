function AboutCard({ icon, emoji, title, text }) {
  return (
    <div className="about-card card h-100 p-3">
      <div className="card-body">
        <div className="about-card-icon">
          <span className="card-icon-code">{icon}</span>
          {emoji && <span className="card-icon-emoji">{emoji}</span>}
        </div>
        <h3 className="about-card-title">{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default AboutCard;
