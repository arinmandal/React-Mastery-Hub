import "./App.css";
import Greet from "./components/Greet";
import Person from "./components/Person";
const App = () => {
	const personName = {
		first: "Bruce",
		last: "Wayne",
	};

	return (
		<div className='App'>
			<Greet name='Alex' messageCount={10} isLoggedIn={true} />
			<Person name={personName} />
		</div>
	);
};

export default App;
