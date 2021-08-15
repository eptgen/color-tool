import Home from './home';
import ColorTool from './tool';
import BBGames from './blackboxgames';
import Contact from './contact';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
	return (<>

	 <Router>
		<header>
        <section id="logo" style={{"textAlign": "center"}}>NES Color Tool</section>
        <nav>
						<ul>
							<Link exact to="/home">Home</Link>
							<Link exact to="/tool">Color Tool</Link>
	            <Link exact to="/blackboxgames">Blackbox Games</Link>
							<Link exact to="/contact">Contact</Link>
	          </ul>
        </nav>
    </header>

		<hr />

		<Switch>
			<Route path="/home" component={Home} />
			<Route path="/tool" component={ColorTool} />
			<Route path="/blackboxgames" component={BBGames} />
			<Route path="/contact" component={Contact} />
		</Switch>

		</Router>
	</>);

}

export default App;
