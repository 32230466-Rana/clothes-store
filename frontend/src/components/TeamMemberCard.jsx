import { Link } from "react-router-dom";

function TeamMemberCard({ image, title, text, links = [] }) {
  return (
    <div className="team-card h-100">
      <img src={image} alt={title} className="team-photo-img" />

      <div className="team-body">
        <h5>{title}</h5>
        <div className="team-small-line"></div>
        <p>{text}</p>

        <div className="team-social-links">
          {links.map((item) =>
            item.href.startsWith("mailto:") ? (
              <a className="team-social-link" href={item.href} key={item.label}>
                {item.label}
              </a>
            ) : (
              <Link className="team-social-link" to={item.href} key={item.label}>
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;