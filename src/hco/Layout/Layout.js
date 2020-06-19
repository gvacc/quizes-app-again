import React from 'react'
import classes from './Layout.module.css'

export default props => {
	return (
		<main className={classes.Layout}>
			{props.children}
		</main>
	)
}