import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import libraryApi from '../../api/libraryApi.ts';
import { NavLink } from 'react-router-dom';
import { AxiosError } from 'axios';
import './loginPage.css';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await libraryApi.get('/sanctum/csrf-cookie');
      await libraryApi.post('/login', data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data.errors.email != undefined) {
          setError('email', {
            type: 'custom',
            message: error.response?.data.message,
          });
        }
        if (error.response?.data.errors.password != undefined) {
          setError('password', {
            type: 'custom',
            message: error.response?.data.message,
          });
        }
      }
    }
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col xs={3}>
            <h1>LoginPage.tsx</h1>
            <p>Lorum Ipsem Page Content Here</p>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-center mb-5">
          <Col xs={4}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control {...register('email', { required: true })} />
                <div className="validation-text">
                  <Form.Text className="text-danger">
                    {errors.email && errors.email.message}
                    {errors.email?.type == 'required' &&
                      'The email field is required'}
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group controlId="password" className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register('password', { required: true })}
                />
                <div className="validation-text">
                  <Form.Text className="text-danger">
                    {errors.password && errors.password.message}
                    {errors.password?.type == 'required' &&
                      'The password field is required'}
                  </Form.Text>
                </div>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={2}>
            <NavLink to={'/register'}>Or Create an Account</NavLink>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
