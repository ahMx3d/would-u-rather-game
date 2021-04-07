export const formatDate = (timestamp) => {
	const d = new Date(timestamp)
	const time = d.toLocaleTimeString("en-US")
	return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString()
}

export const avatarUrlPath = (path) =>
	`http://${window.location.href.split("/")[2]}/${path.slice(1)}`

export const percentCalculator = ({ total, length }) =>
	Number.parseFloat(length / total * 100).toFixed(2)

export const sortUsersByScore = (users) => {
	return Object.values(users).sort(
		(a, b) =>
			+(
				Object.keys(users[b.id].answers).length +
				users[b.id].questions.length
			) -
			(Object.keys(users[a.id].answers).length +
				users[a.id].questions.length),
	)
}
