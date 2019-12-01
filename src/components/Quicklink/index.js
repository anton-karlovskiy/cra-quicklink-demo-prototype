// ray test touch <
/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Ignore location for now...
 * Let's pretend this is a dependency file
 */

import React, { createElement, useEffect, useRef, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { prefetch, listen } from 'quicklink';
import rmanifest from 'route-manifest';

const wrappers = new Set();

function fetchWithAssets(href) {
	prefetch(href).then(() => {
		if (window._rmanifest_) {
			const entry = rmanifest(window._rmanifest_, href);
			const files = entry.files.map(x => x.href);
			if (files.length) prefetch(files);
		}
	});
}

// TODO?: add `options` param here
export function QLink(Component) {
	return function (props) {
		const href = props.to || props.href;
		if (href) {
			// Note: This logs more than it fetches
			// ~> internal Set is preventing duplicates
			console.log('Qlink will prefetch', href);
			fetchWithAssets(href);
		}
		return createElement(Component, props);
	}
}

class ClassWrapper extends Component {
	render() {
		const { children } = this.props;
		return (
			<>
			 {children}
			</>
		)
	}
}

// TODO?: add `options` param here
export function QRoute(Component) {
	return function QRouteComponent(props) {
		const { component, ...rest } = props;
		if (component) rest.component = QRoute(component);
		const ref = useRef(null);

		useEffect(() => {
			console.log('I heard route change~!');

			// find the route's DOM ref
			let elem = findDOMNode(ref.current);
			if (elem) {
				// Does this have <a> tags? If not (eg, loader) move up
				if (elem.nodeType !== 1 || !elem.querySelector('a')) {
					elem = elem.parentElement;
				}

				if (wrappers.has(elem)) {
					console.log('QRoute is already watching', elem);
				} else {
					console.log('QRoute will run `quicklink` on', elem);
					listen({el: elem});
					wrappers.add(elem);
				}
			}

			// todo: unlisten
			return () => {
				console.log('QRoute is releasing', elem);
				wrappers.delete(elem);
			}
		}, [ref]);

		return (
			<ClassWrapper ref={ref}>
				<Component {...rest} />
			</ClassWrapper>
		);
	};
}
// ray test touch >
