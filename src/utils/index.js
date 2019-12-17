
// ray test touch <
import { listen } from './quicklink/index.mjs';

const listenWithRmanifest = async () => {
  if (!window._rmanifest_) {
    const response = await fetch('/rmanifest.json');
    window._rmanifest_ = await response.json();
  }

  const rmanifest = window._rmanifest_;
  let chunks = {};
  for (const route in rmanifest) {
    if (route !== '*' && rmanifest.hasOwnProperty(route)) {
      const chunksForRoute = rmanifest[route];
      const chunkURLs = chunksForRoute.map(chunkForRoute => chunkForRoute.href);
      chunks = {...chunks, [route]: chunkURLs};
    }
  }
  
  console.log('ray : ***** chunks => ', chunks);
  listen({chunks});
};

export {
  listenWithRmanifest
};
// ray test touch >