import SocialLink from "./SocialLink";

function TeamMemberCard({ photoClass, title, text, links }) {
  return (
    <div className="team-card card h-100">
      <div className={"team-photo " + photoClass}></div>

      <div className="team-body card-body">
        <h5>{title}</h5>
        <div className="team-small-line"></div>
        <p>{text}</p>

        <div className="team-social">
          {links.map((link) => (
            <SocialLink
              key={link.label}
              href={link.href}
              label={link.label}
              external={link.external}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;
