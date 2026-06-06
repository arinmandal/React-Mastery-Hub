type statusProps = {
	status: "loading" | "success" | "error";
};

const Status = (props: statusProps) => {
	let message;
	if (props.status === "loading") {
		message = "loading";
	} else if (props.status === "success") {
		message = "Data fetch sucessfully..";
	} else if (props.status === "error") {
		message = "Error fetching Data";
	}

	return (
		<div>
			<h2>Message : {message}</h2>
		</div>
	);
};

export default Status;
