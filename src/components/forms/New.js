import React, { useState, useEffect } from "react"
import { showLoading, hideLoading } from "react-redux-loading"
import { connect } from "react-redux"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import propTypes from "prop-types"
import { newQuestionHandle } from "../../actions/shared"

const New = ({ dispatch, history, authUser }) => {
	const [ [ optionOne, setOptionOne ], [ optionTwo, setOptionTwo ] ] = [
		useState(""),
		useState(""),
	]

	useEffect(() => {
		dispatch(showLoading())
		setTimeout(() => {
			dispatch(hideLoading())
		}, 500)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const submitHandle = (e) => {
		e.preventDefault()
		dispatch(
			newQuestionHandle({
				optionOneText : optionOne,
				optionTwoText : optionTwo,
				author        : authUser,
			}),
		)

		history.push("/")
	}
	return (
		<Container className="mt-5 font-weight-bold">
			<Row className="justify-content-center mx-auto">
				<Col md="7">
					<Card className="mx-auto">
						<Card.Header className="text-center">
							Create New Question
						</Card.Header>
						<Card.Body>
							<Card.Title>Complete the question:</Card.Title>
							<Card.Text>Would you rather...</Card.Text>
							<Form onSubmit={submitHandle}>
								<Form.Group>
									<Form.Control
										type="text"
										onChange={(e) =>
											setOptionOne(e.target.value)}
										placeholder="Enter first option"
										size="lg"
										autoFocus
									/>
								</Form.Group>
								<div className="separator my-3">
									<div className="line" />
									<span className="d-block px-3">OR</span>
									<div className="line" />
								</div>
								<Form.Group>
									<Form.Control
										type="text"
										onChange={(e) =>
											setOptionTwo(e.target.value)}
										placeholder="Enter first option"
										size="lg"
									/>
								</Form.Group>
								<Button
									size="lg"
									block={true}
									variant="success"
									type="submit"
									disabled={!optionOne || !optionTwo}
								>
									Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

New.propTypes = {
	dispatch : propTypes.func.isRequired,
	history  : propTypes.object.isRequired,
	authUser : propTypes.string.isRequired,
}

const mapStateToProps = ({ authUser }) => ({
	authUser,
})

export default connect(mapStateToProps)(New)
