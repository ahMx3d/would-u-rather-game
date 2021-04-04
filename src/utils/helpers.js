export const formatDate = (timestamp) => {
	const d = new Date(timestamp)
	const time = d.toLocaleTimeString("en-US")
	return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString()
}

export const avatarUrlPath = (path) =>
	`http://${window.location.href.split("/")[2]}/${path.slice(1)}`
