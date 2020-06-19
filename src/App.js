import React, {Component} from 'react';
import Layout from './hco/Layout/Layout'

import QuizesList from './containers/QuizesList/QuizesList'
import CreateQuizes from './containers/CreateQuizes/CreateQuizes'
import Quiz from './containers/Quiz/Quiz'
import Login from './containers/Auth/Login/Login'
import Register from './containers/Auth/Register/Register'

import {connect} from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom'
import {autoLogin, clearError} from './store/actions/auth'

import Nav from './components/UI/Nav/Nav'
import Logout from './components/Logout/Logout'
import ShowError from './components/UI/ShowError/ShowError'


class App extends Component {
	componentDidMount() {
		this.props.autoLogin()
	}

	state = {
		isOpen: false,
	}

	clickBurgerHandler = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	clickMenuItemHandler = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	onClickCloseErrorHandler = () => {
		this.props.clearError()
	}

	render() {
		let routes = (
			<Switch>
	    		<Route path="/quiz/:id" component={Quiz}/>
	    		<Route path="/" exact component={QuizesList}/>
	    		<Route path="/auth/login" component={Login}/>
	    		<Route path="/auth/register" component={Register}/>
	    		<Redirect to='/' />
	    	</Switch>
		)

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
		    		<Route path="/quiz/:id" component={Quiz}/>
		    		<Route path="/" exact component={QuizesList}/>
		    		<Route path="/createQuizes" component={CreateQuizes}/>
		    		<Route path="/logout"  component={Logout} />
		    		<Redirect to='/' />
	    		</Switch>			
	    	)
		}

		return (
			<React.Fragment>
				 <Layout>
			    	<Nav 
			    		clickBurgerHandler={this.clickBurgerHandler} 
			    		clickMenuItemHandler = {this.clickMenuItemHandler}
			    		isAuthenticated={this.props.isAuthenticated}
			    		isOpen={this.state.isOpen}
			    	/>
			    	{this.props.error ? <ShowError error={this.props.error} onClickCloseError={this.onClickCloseErrorHandler}/> : null} 
			    	{ routes }
			    </Layout>
			</React.Fragment>
  		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.idToken,
		error: state.auth.error
	}
}

function mapDispatchToProps(dispatch) {
	return {
		autoLogin: () => dispatch(autoLogin()),
		clearError: () => dispatch(clearError())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

