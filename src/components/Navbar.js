import React, { Fragment } from "react"
import Avatar from "react-avatar"
import LoadingBar from "react-redux-loading"
import propTypes from "prop-types"
import {
	Navbar as BootstrapNavbar,
	Nav,
	Container,
	NavDropdown,
} from "react-bootstrap"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { avatarUrlPath } from "../utils/helpers";

const Navbar = ({ user }) => {
	return (
		<Fragment>
			<BootstrapNavbar bg="dark" variant="dark" expand="lg">
				<Container>
					<BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
					<BootstrapNavbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<NavLink className="nav-link" to="/">
								Home
							</NavLink>
							<NavLink className="nav-link" to="/">
								New Question
							</NavLink>
							<NavLink className="nav-link" to="/">
								Leader Board
							</NavLink>
						</Nav>
						{user && (
							<Nav className="ml-auto">
								<NavDropdown
									title={
										<Avatar
											className="img-fluid"
											name={user.name}
											src={user.avatar}
											size={30}
											round="100%"
										/>
									}
									id="user-dropdown"
								>
									<NavDropdown.Item href="#action/3.4">
										{user.name}
									</NavDropdown.Item>
									<NavLink
										className="dropdown-item"
										to="/logout"
									>
										Logout
									</NavLink>
								</NavDropdown>
							</Nav>
						)}
					</BootstrapNavbar.Collapse>
				</Container>
			</BootstrapNavbar>
			<LoadingBar style={{ height: "5px" }} className="bg-primary" />
		</Fragment>
	)
}

Navbar.propTypes = {
	user : propTypes.object,
}

const mapStateToProps = ({ users, authUser }) => ({
	user : Object.values(users)
		.filter((user) => user.id === authUser)
		.map(({ id, name, avatarURL }) => ({
			id,
			name,
			avatar : avatarUrlPath(avatarURL),
		}))[0],
})

export default connect(mapStateToProps)(Navbar)
