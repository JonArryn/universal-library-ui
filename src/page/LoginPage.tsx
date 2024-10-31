import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useForm, SubmitHandler } from 'react-hook-form';
import libraryApi from '../api/libraryApi.ts';
import { NavLink } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await libraryApi.get('/sanctum/csrf-cookie');
    await libraryApi.post('/login', data);
  };
  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <Row className="mb-5">
          <Col>
            <h1>LoginPage.tsx</h1>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-center">
          <Col xs={6}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <Form.Text className="text-danger">
                    This field is required
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="loginPass">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <Form.Text className="text-danger">
                    This field is required
                  </Form.Text>
                )}
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
          <Col xs={1}>
            <p>Or</p>
          </Col>
          <Col xs={5}>
            <NavLink to={'/register'}>Create Account</NavLink>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
