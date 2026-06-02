type GreetProps = {
	name: string;
	messageCount: number;
	isLoggedIn: boolean;
};
const Greet = (props: GreetProps) => {
	return (
		<div>
			<h2>
				{props.isLoggedIn
					? `Good to see you, ${props.name}! 🌟 You’ve got ${props.messageCount} updates
			waiting.`
					: "Welcome Guest!"}
			</h2>
		</div>
	);
};

export default Greet;
