import React, { Fragment } from "react"
import { ProgressBar } from "react-bootstrap"
import { percentCalculator } from "../utils/helpers"
import propTypes from 'prop-types'

const Votes = ({options, authUser}) => {
	const total = [
		...options.optionOne.votes,
		...options.optionTwo.votes,
	].length

	return (
		<Fragment>
			<h3>Results:</h3>
			{Object.entries(options)
				.filter(([ key, { votes } ]) => votes.length)
				.map(([ key, { text, votes } ]) => {
					const [ votesLength, now ] = [
						votes.length,
						percentCalculator({ total, length: votes.length }),
					]
					return (
						<div
							key={key}
							className={`my-4 bg-light border rounded p-3 font-weight-bold
							${votes.includes(authUser) && "border-success"}`}
							style={{ position: "relative" }}
						>
							{votes.includes(authUser) && (
								<div
									className="bg-warning rounded-circle"
									style={{
										position  : "absolute",
										top       : "-2vh",
										right     : "-2vw",
										width     : "50px",
										textAlign : "center",
										color     : "#FFF",
									}}
								>
									<span
										style={{
											display: "inline-block",
											lineHeight: "1",
											padding: "15%",
										}}
									>
										Your Vote
									</span>
								</div>
							)}
							<span>{`Would you rather ${text}?`}</span>
							<div
								className="border rounded my-2"
								style={{ backgroundColor: "#e9ecef" }}
							>
								<ProgressBar
									isChild={true}
									style={{ height: "2em" }}
									className="rounded"
									variant="success"
									now={now}
									label={`${now}%`}
								/>
							</div>
							<span className="d-block text-center">
								{`${votesLength} out of ${total} votes`}
							</span>
						</div>
					)
				})}
		</Fragment>
	)
}

Votes.propTypes = {
	options      : propTypes.object.isRequired,
	authUser     : propTypes.string.isRequired,
}

export default Votes
