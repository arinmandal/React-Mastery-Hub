import "./App.css";
import Greet from "./components/Greet";
import Person from "./components/Person";
import PersonList from "./components/PersonList";
const App = () => {
	const personName = {
		first: "Bruce",
		last: "Wayne",
	};

	const nameList = [
		{
			first: "Clark",
			last: "Kent",
		},
		{
			first: "Princess",
			last: "Diana",
		},
		{
			first: "Barry",
			last: "Allen",
		},
	];

	return (
		<div className='App'>
			<Greet name='Alex' messageCount={10} isLoggedIn={true} />
			<Person name={personName} />
			<PersonList names={nameList} />
		</div>
	);
};

export default App;
