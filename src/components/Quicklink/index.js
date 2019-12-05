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

import React, { useEffect, useRef, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { prefetch, listen } from 'quicklink';
import rmanifest from 'route-manifest';

const wrappers = new Set();

const fetchWithAssets = async url => {
	await prefetch(url);
	try {
    if (!window._rmanifest_) {
      console.log('[components Quicklink fetchWithAssets] route manifest is not stored');
      const response = await fetch('/rmanifest.json');
      const data = await response.json();
      // attach route manifest to global
      window._rmanifest_ = data;
    } else {
      console.log('[components Quicklink fetchWithAssets] route manifest is already stored');
		}
		
		const entry = rmanifest(window._rmanifest_, url);
		const chunkURLs = entry.files.map(file => file.href);
		if (chunkURLs.length) {
			console.log(`[components Quicklink fetchWithAssets ${url}] chunkURLs => `, chunkURLs);
			prefetch(chunkURLs);
		}
  } catch (error) {
    console.log('[components Quicklink fetchWithAssets] error => ', error);
  }
};

// TODO?: add `options` param here
function QLink(Component) {
	return function QLinkComponent(props) {
		useEffect(() => {
			const url = props.to || props.href;
			if (url) {
				// Note: This logs more than it fetches
				// ~> internal Set is preventing duplicates
				console.log('[components Quicklink QLink] Qlink will prefetch ', url);
				fetchWithAssets(url);
			}
		}, [props.to, props.href]);
		return <Component {...props} />
	}
}

class ClassComponentWrapper extends Component {
	render() {
		const { children } = this.props;
		return (
			<>{children}</>
		);
	}
}

// TODO?: add `options` param here
function QRoute(Component) {
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
					console.log('[components Quicklink QRoute] QRoute is already watching', elem);
				} else {
					console.log('[components Quicklink QRoute] QRoute will run `quicklink` on', elem);
					listen({el: elem});
					wrappers.add(elem);
				}
			}

			// todo: unlisten
			return () => {
				console.log('[components Quicklink QRoute] QRoute is releasing', elem);
				wrappers.delete(elem);
			};
		}, [ref]);

		return (
			<ClassComponentWrapper ref={ref}>
				<Component {...rest} />
			</ClassComponentWrapper>
		);
	};
}

export {
	QLink,
	QRoute
};
