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

import React, { lazy, Suspense, useEffect } from 'react';
// ray test touch <
import { Route } from 'react-router-dom';
// import { listen } from 'quicklink';

// import { Route } from '@components/Router';
// ray test touch >
import Footer from '@components/Footer';
import Hero from '@components/Hero';
import style from './index.module.css';

// Route-Split Components
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@pages/Home'));
const About = lazy(() => import(/* webpackChunkName: "about" */ '@pages/About'));
const Article = lazy(() => import(/* webpackChunkName: "article" */ '@pages/Article'));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ '@pages/Blog'));

// ray test touch <
const App = () => {
	useEffect(() => {
		console.log('ray : ***** [App] rendering done');
		window.addEventListener('load', () => {
			console.log('ray : ***** [App] load event done');
		});
	}, []);
	return (
		<div className={style.app}>
			<Hero />
			<main className={style.wrapper}>
				<Suspense fallback={<div>Loading...</div>}>
					<Route path="/" exact component={Home} />
					<Route path="/blog" exact component={Blog} />
					<Route path="/blog/:title" component={Article} />
					<Route path="/about" exact component={About} />
				</Suspense>
			</main>
			<Footer />
		</div>
	);
};
// ray test touch >

export default App;
