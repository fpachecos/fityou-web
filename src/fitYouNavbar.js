import logo from './img/fityou-logos_white.png';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

function FitYouNavbar() {
	return (
		<Navbar bg="light" expand="md" sticky="top" className="main-navbar">
			<Container>
				<Navbar.Brand href="/">
					<img
						src={logo}
						className="d-inline-block align-top mainlogo"
						alt="React Bootstrap logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/exercise">Exercícios</Nav.Link>
						<Nav.Link href="/workout">Treino</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default FitYouNavbar;