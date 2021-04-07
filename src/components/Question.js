import React from "react"
import Avatar from "react-avatar"
import { connect } from "react-redux"
import { Card, Row, Col, Button } from "react-bootstrap"
import { withRouter } from "react-router-dom"
import propTypes from "prop-types"
import { avatarUrlPath } from "../utils/helpers"

const Question = ({
	id,
	optionOne,
	optionTwo,
	authorName,
	authorAvatar,
	history,
}) => {
	const redirectTo = (e) => {
		e.preventDefault()
		history.push(`questions/${id}`)
	}

	return (
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
						<h3>Would you rather</h3>
						<p className="my-4">{`${optionOne} / ${optionTwo}`}</p>
						<Button
							variant="outline-success"
							size="lg"
							block
							onClick={redirectTo}
						>
							View Poll
						</Button>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}

Question.propTypes = {
	id           : propTypes.string.isRequired,
	optionOne    : propTypes.string.isRequired,
	optionTwo    : propTypes.string.isRequired,
	authorName   : propTypes.string.isRequired,
	authorAvatar : propTypes.string.isRequired,
	history      : propTypes.object.isRequired,
}

const mapStateToProps = ({ questions, users }, { id }) => {
	const question = questions[id],
		user = users[question.author]
	return {
		authorName   : user.name,
		authorAvatar : avatarUrlPath(user.avatarURL),
		optionOne    : question.optionOne.text,
		optionTwo    : question.optionTwo.text,
	}
}

export default withRouter(connect(mapStateToProps)(Question))
