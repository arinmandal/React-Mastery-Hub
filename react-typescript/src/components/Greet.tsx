type GreetProps = {
	name: string;
};
const Greet = (props: GreetProps) => {
	return (
		<div>Good to see you, {props.name}! 🌟 You’ve got 10 updates waiting.</div>
	);
};

export default Greet;
