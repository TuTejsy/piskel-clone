import renderPage from './components/loading/pageView/renderPage';
import onSignIn from './components/loading/oAuth/googleAuth';

import './components/loading/pageView/index.css';
import './components/loading/pageView/reset.css';

renderPage();

window.onSignIn = onSignIn;
