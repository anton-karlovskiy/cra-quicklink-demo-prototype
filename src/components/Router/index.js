/**
 * Important relevant bits from `react-router-dom` and reexport.
 * Even though we only care about `Link` and `Route` here, it's
 *   lumped together because 🌈application design.
 */

// Note: This would be a dependency
import { QLink, QRoute } from '../Quicklink';
import { Link as L, Route as R, withRouter, BrowserRouter } from 'react-router-dom';

export { BrowserRouter, withRouter };

export const Link = QLink(L);
export const Route = QRoute(R);
