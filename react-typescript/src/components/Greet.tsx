type GreetProps = {
	name: string;
	messageCount?: number;
	isLoggedIn: boolean;
};
const Greet = (props: GreetProps) => {
	const { messageCount = 0 } = props;
	return (
		<div>
			<h2>
				{props.isLoggedIn
					? `Good to see you, ${props.name}! 🌟 You’ve got ${messageCount} updates
			waiting.`
					: "Welcome Guest!"}
			</h2>
		</div>
	);
};

export default Greet;
