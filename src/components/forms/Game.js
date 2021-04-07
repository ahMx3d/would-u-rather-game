import React, { Fragment, useState} from "react"
import {Form, Button } from 'react-bootstrap'
import { questionAnswerHandle } from "../../actions/shared"
import { authUserLogout } from "../../actions/shared"
import propTypes from 'prop-types'

const Game = ({options, history, authUser, id, dispatch}) => {
	const [ answer, setAnswer ] = useState("")
	const submitHandle = (e) => {
		e.preventDefault()
		!answer
			? dispatch(authUserLogout())
			: dispatch(
					questionAnswerHandle({
						authedUser : authUser,
						qid        : id,
						answer,
					}),
				)
		history.push(`/questions/${id}`)
	}
	return (
		<Fragment>
			<h3>Would you rather ...</h3>
			<Form onSubmit={submitHandle}>
				{Object.entries(options).map(([ value, label ]) => (
					<div key={value} className="mb-3 font-weight-bold">
						<Form.Check
							type="radio"
							id={value}
							label={label.text}
							name="options"
							value={value}
							onChange={(e) => setAnswer(e.target.value)}
						/>
					</div>
				))}
				<Button
					variant="success"
					type="submit"
					disabled={!answer}
					size="lg"
					block
				>
					Submit
				</Button>
			</Form>
		</Fragment>
	)
}

Game.propTypes = {
	id           : propTypes.string.isRequired,
	options      : propTypes.object.isRequired,
	authUser     : propTypes.string.isRequired,
	dispatch     : propTypes.func.isRequired,
	history      : propTypes.object.isRequired,
}

export default Game
