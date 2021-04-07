import React from "react"
import { connect } from "react-redux"
import { Container, Row, Col, Card } from "react-bootstrap"
import { GiTrophyCup } from "react-icons/gi"
import Avatar from "react-avatar"
import { sortUsersByScore, avatarUrlPath } from "../utils/helpers"
import propTypes from "prop-types"

const Board = ({ users }) => {
	return (
		<Container className="mt-5 font-weight-bold">
			{users.map(({ id, name, avatarURL, answers, questions }, idx) => {
				let color
				if (idx === 0) {
					color = "text-warning"
				} else if (idx === 1) {
					color = "text-success"
				} else {
					color = "text-dark"
				}
				return (
					<Row
						key={id}
						className="justify-content-center mx-auto my-3"
					>
						<Col sm="9">
							<Card className="mx-auto">
								<Card.Body className="position-relative">
									<div
										style={{
											position    : "absolute",
											top         : "0vh",
											left        : "0vw",
											width       : "0",
											height      : "0",
											borderTop   :
												"70px solid rgba(0,0,0,.1)",
											borderRight :
												"70px solid transparent",
											textAlign   : "center",
										}}
										className={color}
									>
										<GiTrophyCup
											style={{
												position : "absolute",
												top      : "-60",
												left     : "7",
												fontSize : "1.7rem",
											}}
										/>
									</div>
									<Row>
										<Col className="m-auto" sm={3}>
											<Avatar
												className="img-fluid"
												src={avatarUrlPath(avatarURL)}
												name={name}
												size="100%"
												round="100%"
											/>
										</Col>
										<Col sm={5} className="border-left">
											<Card.Title className="font-weight-bold my-4">
												{name}
											</Card.Title>
											<div className="m-auto d-flex justify-content-between">
												<span className="d-block">
													Answered Questions
												</span>
												<span className="d-block">
													{
														Object.keys(answers)
															.length
													}
												</span>
											</div>
											<hr className="my-2" />
											<div className="d-flex justify-content-between">
												<span className="d-block">
													Created Questions
												</span>
												<span className="d-block">
													{questions.length}
												</span>
											</div>
										</Col>
										<Col sm={4} className="border-left">
											<Card className="text-center">
												<Card.Header className="bg-light">
													Score
												</Card.Header>
												<Card.Body>
													<div
														className="mx-auto bg-success rounded-circle d-flex justify-content-center align-items-center text-white"
														style={{
															width  : "50px",
															height : "50px",
														}}
													>
														<span
															style={{
																fontSize :
																	"2rem",
															}}
														>
															{
																+(
																	Object.keys(
																		answers,
																	).length +
																	questions.length
																)
															}
														</span>
													</div>
												</Card.Body>
											</Card>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				)
			})}
		</Container>
	)
}

Board.propTypes = {
	users : propTypes.array.isRequired,
}

const mapStateToProps = ({ users }) => {
	return {
		users : sortUsersByScore(users),
	}
}

export default connect(mapStateToProps)(Board)
