/* eslint-disable react/prop-types */
import "./App.css";

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

function Avater(props) {
  return <img className="avatar" src={props.profile} />;
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
      <Skill skill="React" emoji="💪" color="blue" />
      <Skill skill="HTML+CSS" emoji="💪" color="orange" />
      <Skill skill="JavaScript" emoji="💪" color="yellow" />
      <Skill skill="Git&GitHub" emoji="👶" color="orangered" />
    </div>
  );
}
function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <span>{props.skill}</span>
      <span>{props.emoji}</span>
    </div>
  );
}
export default App;
