import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { ImLibrary } from 'react-icons/im';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { BsFillMoonStarsFill } from 'react-icons/bs';

const AppNavigation = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="overflow-visible py-1">
        <Navbar.Brand href="#home">
          <Stack direction="horizontal" gap={2}>
            <ImLibrary className="text-center" /> Universal Library
          </Stack>
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/app/dashboard" className="nav-link">
            Libraries
          </NavLink>
        </Nav>
        <Nav>
          <Stack direction="horizontal">
            <NavLink to="/logout" className="nav-link ms-auto">
              Logout
            </NavLink>
            <BsFillMoonStarsFill />
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavigation;
