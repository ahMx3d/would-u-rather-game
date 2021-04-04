import React from "react"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component: Component, authUser, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			!authUser ? (
				<Redirect
					to={{
						pathname : "/",
						state    : {
							from : props.location,
						},
					}}
				/>
			) : (
				<Component {...props} />
			)}
	/>
)

const mapStateToProps = ({ authUser }) => ({
	authUser,
})

export default connect(mapStateToProps)(ProtectedRoute)
