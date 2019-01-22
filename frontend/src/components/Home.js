import React from 'react'
// TODO - add proptypes

const Home = props => {
	if (props.user) {
		return (
			<div className="Home">
				<p>Thank you for logging in</p>
			</div>
		)
	} else {
		return(
			<div className="Home">
				<p>Please log in or signup</p>
			</div>
		)
	}
}

export default Home