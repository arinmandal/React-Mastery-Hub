import { useState } from "react";
import "./App.css";
export default function App() {
  const faqs = [
    {
      title: "Where are these chairs assembled?",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
    },
    {
      title: "How long do I have to return my chair?",
      text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
    },
    {
      title: "Do you ship to countries outside the EU?",
      text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
    },
  ];
  return (
    <div className="App">
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [cardOpen, setCardOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((faqs, i) => (
        <AccordionItems
          cardOpen={cardOpen}
          OnOpen={setCardOpen}
          key={i}
          title={faqs.title}
          // text={faqs.text}
          num={i}
        >
          {faqs.text}
        </AccordionItems>
      ))}
      <AccordionItems
        cardOpen={cardOpen}
        OnOpen={setCardOpen}
        key="07"
        title="Test 1"
        // text={faqs.text}
        num="07"
      >
        <p>Allow React develop to :</p>
        <ul>
          <li>Breakup UI into Components</li>
          <li>Make components reusable</li>
          <li>Place State efficiently</li>
        </ul>
      </AccordionItems>
    </div>
  );
}
function AccordionItems({ num, title, children, cardOpen, OnOpen }) {
  // const [isOpen, setIsOpen] = useState(false);

  const isOpen = num === cardOpen;

  function handleToggle() {
    // setIsOpen((isOpen) => !isOpen);
    OnOpen(isOpen ? null : num);
  }
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
