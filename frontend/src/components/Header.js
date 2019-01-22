import React from 'react'
// TODO - add proptypes

const Header = props => {
	let Greeting
	if (props.user === null) {
		Greeting = <h3>Hello Guest</h3>
	} else if (props.user.local.username) {
		Greeting = (
			<h3>
				Welcome, <strong>{props.user.local.username} </strong>
			</h3>
		)
	}
	return (
		<div className="Header">
			{Greeting}
		</div>
	)
}

export default Header