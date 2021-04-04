import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import propTypes from "prop-types"
import { showLoading, hideLoading } from "react-redux-loading"
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap"
import Avatar from "react-avatar"
import { avatarUrlPath } from "../utils/helpers"
import { questionAnswerHandle } from "../actions/shared"
import { authUserLogout } from "../actions/shared"

const Game = ({
	id,
	authorName,
	authorAvatar,
	dispatch,
	history,
	options,
	authUser,
}) => {
	const [ answer, setAnswer ] = useState("")
	useEffect(() => {
		dispatch(showLoading())
		setTimeout(() => {
			dispatch(hideLoading())
		}, 500)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const submitHandle = (e) => {
		e.preventDefault()
		!answer
			? dispatch(authUserLogout())
			: dispatch(
					questionAnswerHandle({
						authedUser : authUser,
						qid        : id,
						answer,
					}),
				)
		history.push("/home")
	}
	return (
		<Container className="mt-3">
			<Row className="justify-content-center mx-5">
				<Col md="auto">
					<Card className="mt-3">
						<Card.Header>{`${authorName} Asks:`}</Card.Header>
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
									<h3>Would you rather ...</h3>
									<Form onSubmit={submitHandle}>
										{Object.entries(
											options,
										).map(([ value, label ]) => (
											<div
												key={value}
												className="mb-3 font-weight-bold"
											>
												<Form.Check
													type="radio"
													id={value}
													label={label}
													name="options"
													value={value}
													onChange={(e) =>
														setAnswer(
															e.target.value,
														)}
												/>
											</div>
										))}
										<Button
											variant="success"
											type="submit"
											disabled={!answer}
											size="lg"
											block
										>
											Submit
										</Button>
									</Form>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

Game.propTypes = {
	id           : propTypes.string.isRequired,
	options      : propTypes.object.isRequired,
	authorName   : propTypes.string.isRequired,
	authUser     : propTypes.string.isRequired,
	authorAvatar : propTypes.string.isRequired,
	dispatch     : propTypes.func.isRequired,
	history      : propTypes.object.isRequired,
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
			optionOne : question.optionOne.text,
			optionTwo : question.optionTwo.text,
		},
	}
}

export default connect(mapStateToProps)(Game)
