import React, { useEffect, useState } from "react"
import propTypes from "prop-types"
import { connect } from "react-redux"
import { Card, Container, Row, Col, Tabs, Tab } from "react-bootstrap"
import { showLoading, hideLoading } from "react-redux-loading"
import Question from "./Question"
import { withRouter } from "react-router-dom"

const Home = ({ answered, unanswered, dispatch }) => {
	const [ activeKey, setActiveKey ] = useState("unanswered")
	useEffect(() => {
		if (unanswered.length === 0) setActiveKey("answered")
		dispatch(showLoading())
		setTimeout(() => {
			dispatch(hideLoading())
		}, 500)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const activeKeyHandler = () =>{
			let status
			if (activeKey === "unanswered") {
				status = 'answered'
			} else if(unanswered.length !== 0){
				status = 'unanswered'
			} else {
				status = 'answered'
			}
			return setActiveKey(status)
		}

	return (
		<Container className="mt-3">
			<h1 className="text-center">Questions</h1>
			<Row className="justify-content-center mx-5">
				<Col md="auto">
					<Card className="mx-5">
						<Card.Body>
							<Tabs
								activeKey={activeKey}
								onSelect={activeKeyHandler}
								id="questions"
								variant="pills"
								justify={true}
								className="mx-0"
							>
								<Tab eventKey="unanswered" title="Unanswered">
									{unanswered.map((id) => (
										<Question key={id} id={id} />
									))}
								</Tab>
								<Tab eventKey="answered" title="Answered">
									{answered.map((id) => (
										<Question key={id} id={id} />
									))}
								</Tab>
							</Tabs>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

Home.propTypes = {
	answered   : propTypes.array.isRequired,
	unanswered : propTypes.array.isRequired,
	dispatch   : propTypes.func.isRequired,
}

const mapStateToProps = ({ users, questions, authUser }) => {
	const answered = Object.keys(users[authUser].answers).sort(
		(a, b) => questions[b].timestamp - questions[a].timestamp,
	)
	const unanswered = Object.keys(questions)
		.filter((question) => !answered.includes(question))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

	return { answered, unanswered }
}

export default withRouter(connect(mapStateToProps)(Home))
