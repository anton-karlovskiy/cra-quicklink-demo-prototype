import React from 'react';
import style from './index.css';

export default function (props) {
	return (
		<header className={ style.intro }>
			{ props.children }
		</header>
	);
}
