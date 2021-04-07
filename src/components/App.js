import React, { useEffect } from "react"
import propTypes from "prop-types"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import { connect } from "react-redux"
import { initialDataHandle } from "../actions/shared"
import Login from "./forms/Login"
import Navbar from "./Navbar"
import Home from "./Home"
import Logout from "./Logout"
import Details from "./Details"
import New from "./forms/New"
import Board from "./Board"
import NotFound from "./errors/NotFound"

const App = ({ authUser, dispatch }) => {
	useEffect(
		() => {
			dispatch(initialDataHandle())
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	)
	return (
		<Router>
			<div className="App">
					<Navbar id={authUser} />
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/login" component={Login} />
					<ProtectedRoute path="/logout" component={Logout} />
					<ProtectedRoute path="/questions/:id" component={Details} />
					<ProtectedRoute path="/leaderboard" component={Board} />
					<ProtectedRoute path="/add" component={New} />
					<ProtectedRoute path="/home" component={Home} />
					<Route path="*" render={()=><NotFound/>} />
				</Switch>
			</div>
		</Router>
	)
}

App.propTypes = {
	dispatch : propTypes.func.isRequired,
	authUser : propTypes.string,
}

const mapStateToProps = ({ authUser }) => ({
	authUser,
})

export default connect(mapStateToProps)(App)
