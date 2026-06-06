import "./App.css";
import Greet from "./components/Greet";
import Heading from "./components/Heading";
import Oscar from "./components/Oscar";
import Person from "./components/Person";
import PersonList from "./components/PersonList";
import Status from "./components/Status";
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
			{/* <Greet name='Alex' messageCount={10} isLoggedIn={true} /> */}
			<Person name={personName} />
			<PersonList names={nameList} />
			<Status status='error' />
			<Heading>Placeholder text</Heading>
			<Oscar>
				<Heading>Oscar goes to Leonardo Dicpario!</Heading>
			</Oscar>

			<Greet name='Alex' isLoggedIn={true}/>
		</div>
	);
};

export default App;
