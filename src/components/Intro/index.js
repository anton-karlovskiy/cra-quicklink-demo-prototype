import React from 'react';
import style from './index.module.css';

export default function (props) {
	return (
		<header className={ style.intro }>
			{ props.children }
		</header>
	);
}
