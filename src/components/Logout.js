import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import {authUserLogout} from '../actions/shared'
import propTypes from 'prop-types'

const Logout = ({dispatch, location}) => {
	useEffect(() => {
		dispatch(authUserLogout())
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<Redirect
			to={{
				pathname : "/",
				state    : {
					from : location,
				},
			}}
		/>
	)
}

Logout.propTypes = {
    dispatch: propTypes.func.isRequired,
    location: propTypes.object.isRequired,
}

export default connect()(Logout)
