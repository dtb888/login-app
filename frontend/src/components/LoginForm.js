import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		// this.googleSignin = this.googleSignin.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="LoginForm">
					<h1>Login form</h1>
					<form>
						<label className="username">Username: </label>
						<br/>
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
						<br/>
						<label className="password">Password: </label>
						<br/>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						<br/>
						<br/>
						<button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
					</form>
				</div>
			)
		}
	}
}

export default LoginForm