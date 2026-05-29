function ChooseBox({ icon, emoji, title, text }) {
  return (
    <div className="choose-box card h-100 p-3">
      <div className="card-body">
        <div className="choose-icon">
          <span className="card-icon-code">{icon}</span>
          {emoji && <span className="card-icon-emoji">{emoji}</span>}
        </div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ChooseBox;
