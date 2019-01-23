import React from 'react'
// TODO - add proptypes

const User = props => {
	if (props.user) {
		return (
			<div className="User">
				<p>Thank you for logging in</p>
			</div>
		)
	} else {
		return(
			<div className="User">
				<p>Please log in or signup</p>
			</div>
		)
	}
}

export default User