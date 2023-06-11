/* eslint-disable react/prop-types */
import "./App.css";
const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Tailwind",
    level: "beginner",
    color: "#FF3B00",
  },
];
function App() {
  return (
    <div className="card">
      <Avater profile="\Arin.jpg" />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}
// Destructuring of Props
function Avater({ profile }) {
  return <img className="avatar" src={profile} />;
}

function Intro() {
  return (
    <div style={{ color: "black" }}>
      <h1>Arin Mandal</h1>
      <p>
        Full-stack web developer. When not coding, I like to play Pubg. capture
        moments with my camera. And I love sunsets.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill key={skill.skill} skill={skill.skill} level={skill.level} color={skill.color} />
      ))}
    </div>
  );
}
function Skill({ skill, level, color }) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>
        {level === "beginner" && "👶"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪"}
      </span>
    </div>
  );
}
export default App;
