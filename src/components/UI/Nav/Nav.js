import React from 'react'
import {NavLink} from 'react-router-dom'

import classes from './Nav.module.css'

export default props => {
	const links =  [ 
			{id: 1, text: 'Список тестов', to: '/', exact: true},
	]

	const clsNav = [
		classes.Nav
	]
	const burgerClasses = [
		classes.burger
	]

	if(!props.isAuthenticated) {
		links.push({id: 2, text: 'Авторизация', to: '/auth/login'})
		links.push({id: 3, text: 'Регистрация', to: '/auth/register'})
	} else {
		links.push(
			{id: 2, text: 'Создать тесты', to: '/createQuizes'},
			{id: 3, text: "Выйти", to: '/logout'}
		)
	}

	if(props.isOpen) {
		clsNav.push(classes.open)
		burgerClasses.push('icon-cancel') 
	} else {
		clsNav.push(classes.close)
		burgerClasses.push('icon-menu') 
	}
	
	const renderLinks =() => {
		return links.map((key, value) => {
			return(
				<li onClick={props.clickMenuItemHandler}  key={key.id}>
					<NavLink activeStyle={{color: '#FF9800'}} to={key.to} exact>
					{key.text}</NavLink>
				</li>
			)
		})
	}
	
	return(
		<nav className={clsNav.join(' ')}>
			<i onClick={props.clickBurgerHandler} className={burgerClasses.join(' ')} />
			<ul> {renderLinks()} </ul>
			<div onClick={props.clickBurgerHandler} className={classes.wrapper}></div>
		</nav>
	)
}