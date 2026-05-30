import Footer from "../components/Footer";
import AboutCard from "../components/AboutCard";
import ChooseBox from "../components/ChooseBox";
import TeamMemberCard from "../components/TeamMemberCard";

import parisImg from "../assets/paris.webp";
import managerImg from "../assets/manger.jpg";
import advisorImg from "../assets/fashionadvisor.jpg";
import supportImg from "../assets/customersupp.webp";

class StoreInfo {
  constructor(name, city) {
    this.name = name;
    this.city = city;
  }

  getDescription() {
    return this.name + " is inspired by the elegance of " + this.city + ".";
  }
}

const storeInfo = new StoreInfo("Fashion Store", "Paris");

const values = [
  {
    icon: "01",
    emoji: "🎯",
    title: "Our Mission",
    text: "To offer stylish and comfortable fashion for everyday life.",
  },
  {
    icon: "02",
    emoji: "👁️",
    title: "Our Vision",
    text: "To become a trusted destination for modern and elegant fashion.",
  },
  {
    icon: "03",
    emoji: "💗",
    title: "Our Values",
    text: "Quality, beauty, simplicity, and customer satisfaction.",
  },
];

const chooseItems = [
  {
    icon: "ST",
    emoji: "👗",
    title: "Modern Style",
    text: "Simple and beautiful fashion for every season.",
  },
  {
    icon: "QL",
    emoji: "🏅",
    title: "Good Quality",
    text: "Comfortable clothing and carefully selected pieces.",
  },
  {
    icon: "DS",
    emoji: "👜",
    title: "Elegant Design",
    text: "A clean shopping experience with soft and attractive style.",
  },
];

const teamMembers = [
  {
    image: managerImg,
    title: "Store Manager",
    text: "Leading the store with care and style.",
    links: [
      { href: "/contact", label: "CT" },
      { href: "mailto:store@mail.com", label: "EM" },
    ],
  },
  {
    image: advisorImg,
    title: "Fashion Advisor",
    text: "Helping customers choose the best looks.",
    links: [
      { href: "/products", label: "CL" },
      { href: "/size-guide", label: "SZ" },
    ],
  },
  {
    image: supportImg,
    title: "Customer Support",
    text: "Making every shopping experience better.",
    links: [
      { href: "/support", label: "SP" },
      { href: "mailto:store@mail.com", label: "EM" },
    ],
  },
];

function About() {
  return (
    <div className="about-page">
      <section className="section-space about-hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 mb-4">
              <div
                className="about-image-box"
                style={{ backgroundImage: `url(${parisImg})` }}
              ></div>
            </div>

            <div className="col-md-7 mb-4">
              <div className="about-text-box">
                <h1>About Us</h1>
                <div className="title-line title-line-left"></div>

                <p>{storeInfo.getDescription()}</p>

                <p>
                  We offer carefully selected pieces that reflect beautiful
                  style, comfort, and quality for every season.
                </p>

                <p>
                  Our collections are inspired by refined details and timeless
                  designs made for people who love confidence and simplicity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space about-story-section">
        <div className="container">
          <h2 className="section-title about-section-title">Our Story</h2>
          <div className="title-line"></div>

          <div className="story-box">
            <p>
              Fashion Store was born from a love of elegance, beauty, and
              everyday comfort. We created a store that celebrates confidence,
              refined clothing, and practical style.
            </p>

            <p className="story-box-second">
              Every design is selected to bring a modern look with a classic
              touch, making sure each piece feels easy to wear.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space about-values-section">
        <div className="container">
          <h2 className="section-title about-section-title">What We Believe</h2>
          <div className="title-line"></div>

          <div className="row row-cols-1 row-cols-md-3 g-4 mt-2 text-center">
            {values.map((item) => (
              <div className="col" key={item.title}>
                <AboutCard
                  icon={item.icon}
                  emoji={item.emoji}
                  title={item.title}
                  text={item.text}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space about-choose-section">
        <div className="container">
          <h2 className="section-title about-section-title">Why Choose Us</h2>
          <div className="title-line"></div>

          <div className="row row-cols-1 row-cols-md-3 g-4 mt-2 text-center">
            {chooseItems.map((item) => (
              <div className="col" key={item.title}>
                <ChooseBox
                  icon={item.icon}
                  emoji={item.emoji}
                  title={item.title}
                  text={item.text}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space about-team-section">
        <div className="container">
          <h2 className="section-title about-section-title">Our Team</h2>
          <div className="title-line"></div>

          <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
            {teamMembers.map((member) => (
              <div className="col" key={member.title}>
                <TeamMemberCard
                  image={member.image}
                  title={member.title}
                  text={member.text}
                  links={member.links}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;