import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { ImLibrary } from 'react-icons/im';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';

const HomeNavigation = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container className="overflow-visible py-1">
        <Navbar.Brand href="#home">
          <Stack direction="horizontal" gap={2}>
            <ImLibrary className="text-center" /> Universal Library
          </Stack>
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </Nav>
        <Nav>
          <Stack direction="horizontal">
            <NavLink to="/login" className="nav-link ms-auto">
              Login
            </NavLink>
            <BsFillMoonStarsFill />
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HomeNavigation;
