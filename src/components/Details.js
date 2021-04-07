import React, { useEffect } from "react"
import { connect } from "react-redux"
import propTypes from "prop-types"
import { showLoading, hideLoading } from "react-redux-loading"
import { Container, Card, Row, Col } from "react-bootstrap"
import Avatar from "react-avatar"
import { avatarUrlPath } from "../utils/helpers"
import Game from "./forms/Game"
import Votes from "./Votes"

const Details = ({
	id,
	authorName,
	authorAvatar,
	dispatch,
	history,
	options,
	authUser,
	isAnswered,
}) => {
	useEffect(() => {
		dispatch(showLoading())
		setTimeout(() => {
			dispatch(hideLoading())
		}, 500)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<Container className="mt-3">
			<Row className="justify-content-center mx-5">
				<Col md="auto">
					<Card className="mt-3">
						<Card.Header className="font-weight-bold">
							{!isAnswered ? (
								`${authorName} Asks:`
							) : (
								`Asked by ${authorName}`
							)}
						</Card.Header>
						<Card.Body>
							<Row>
								<Col sm={3}>
									<Avatar
										className="img-fluid"
										src={authorAvatar}
										name={authorName}
										size="100%"
										round="100%"
									/>
								</Col>
								<Col sm={9} className="border-left">
									{!isAnswered ? (
										<Game
											options={options}
											history={history}
											authUser={authUser}
											id={id}
											dispatch={dispatch}
										/>
									) : (
										<Votes
											options={options}
											authUser={authUser}
										/>
									)}
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

Details.propTypes = {
	id           : propTypes.string.isRequired,
	options      : propTypes.object.isRequired,
	authorName   : propTypes.string.isRequired,
	authUser     : propTypes.string.isRequired,
	authorAvatar : propTypes.string.isRequired,
	dispatch     : propTypes.func.isRequired,
	history      : propTypes.object.isRequired,
	isAnswered   : propTypes.bool.isRequired,
}

const mapStateToProps = ({ questions, users, authUser }, props) => {
	const id = props.match.params.id,
		question = questions[id],
		user = users[question.author]
	return {
		id,
		authUser,
		authorName   : user.name,
		authorAvatar : avatarUrlPath(user.avatarURL),
		options      : {
			optionOne : question.optionOne,
			optionTwo : question.optionTwo,
		},
		isAnswered   : [
			...question.optionOne.votes,
			...question.optionTwo.votes,
		].includes(authUser),
	}
}

export default connect(mapStateToProps)(Details)
