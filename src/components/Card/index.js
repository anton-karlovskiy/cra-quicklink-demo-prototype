import React from 'react';
import style from './index.css';

export default function (props) {
	return (
		<div className={ style.card }>
			{ props.children }
		</div>
	);
}
