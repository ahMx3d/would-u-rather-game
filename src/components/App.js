import React, { useEffect } from "react"
import propTypes from "prop-types"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import { connect } from "react-redux"
import { initialDataHandle } from "../actions/shared"
import Login from "./Login"
import Navbar from "./Navbar"
import Home from "./Home"
import "./App.css"
import Logout from "./Logout"
import Game from "./Game"

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
					<ProtectedRoute path="/answered-questions/:id" component={Game} />
					<ProtectedRoute path="/home" component={Home} />
					<Route path="*" render={() => <h1>404 Not Found</h1>} />
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
