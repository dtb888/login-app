import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
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
		// TODO - validate!
		if (this.state.password === this.state.confirmPassword && this.state.password !== '') {
			axios
				.post('/auth/signup', {
					username: this.state.username,
					password: this.state.password
				})
				.then(response => {
					console.log(response)
					if (!response.data.error) {
						console.log('youre good')
						this.setState({
							redirectTo: '/login'
						})
					} else {
						console.log(response.data.error)
						alert(response.data.error)
						this.setState({
							username: '',
							password: '',
							confirmPassword: ''
						})
					}
				})
		} else {
			alert('Passwords do not match')
		}
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="SignupForm">
				<h1>Signup form</h1>
				<div className="container">
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
					<label className="confirmPassword">Confirm Password: </label>
					<br/>
					<input
						type="password"
						name="confirmPassword"
						value={this.state.confirmPassword}
						onChange={this.handleChange}
					/>
					<br/>
					<br/>
					<button className="btn btn-primary" onClick={this.handleSubmit}>Sign up</button>
				</div>
			</div>
		)
	}
}

export default SignupForm