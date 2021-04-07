import React, { Fragment, useState } from "react"
import Select from "react-select"
import Avatar from "react-avatar"
import propTypes from "prop-types"
import { Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"
import { authUserSet } from "../../actions/auth"
import { avatarUrlPath } from "../../utils/helpers";

const Login = ({users, history, dispatch, authUser, location}) => {
	const { from } = location.state || { from: { pathname: '/' } };

	const [ user, setUser ] = useState("")

	const [ primaryColor, secondaryLightColor, reduxColor ] = [
		"#6EDAFC",
		"hsl(0, 0%, 97%)",
		"#764ABD",
	]

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(authUserSet(user.value))
		history.push(from)
	}

	const theme = (defaultTheme) => ({
		...defaultTheme,
		colors  : {
			...defaultTheme.colors,
			primary25 : secondaryLightColor,
			primary   : reduxColor,
		},
		spacing : {
			...defaultTheme.spacing,
			controlHeight : 50,
			menuGutter    : 0,
		},
	})

	const options = (users) =>
		users.map(({ id, avatar, name }) => ({
			value : id,
			label : (
				<div className="text-left m-0" style={{ cursor: "pointer" }}>
					<Avatar
						className="img-fluid"
						src={avatar}
						size={40}
						round="100%"
					/>
					<span className="mx-2 text-md-left font-weight-bolder">
						{name}
					</span>
				</div>
			),
		}))
		
	return authUser ? (
		<Redirect to={from} />
	) : (
		<Fragment>
			<Container className="mt-5">
				<Row className="justify-content-center">
					<Col md="auto">
						<Card className="text-center mx-5">
							<Card.Header>
								<Card.Title>
									Welcome to the Would You Rather App!
								</Card.Title>
								<Card.Text>
									Please sign in to continue
								</Card.Text>
							</Card.Header>
							<Card.Body>
								<Card.Img
									variant="top"
									className="mx-auto d-block img-fluid h-25 w-25"
									src="./logo.jpeg"
									alt="logo"
								/>
								<h3 style={{ color: primaryColor }}>Sign In</h3>
								<Form onSubmit={handleSubmit}>
									<Form.Group>
										<Select
											theme={theme}
											onChange={setUser}
											options={options(users)}
											placeholder="Search for or Select a user"
											noOptionsMessage={() =>
												"This credential does not match our records :("}
											isSearchable
											autoFocus
										/>
									</Form.Group>
									<Button
										style={{
											border     : primaryColor,
											background : !user
												? reduxColor
												: primaryColor,
										}}
										size="lg"
										block={true}
										disabled={!user}
										type="submit"
									>
										Sign In
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	)
}

Login.propTypes = {
	dispatch : propTypes.func.isRequired,
	users    : propTypes.array.isRequired,
	history  : propTypes.object.isRequired,
}

const mapStateToProps = ({ users, authUser }) => ({
	authUser,
	users : Object.values(users).map(({ id, name, avatarURL }) => ({
		id,
		name,
		avatar : avatarUrlPath(avatarURL),
	})),
})

export default withRouter(connect(mapStateToProps)(Login))
