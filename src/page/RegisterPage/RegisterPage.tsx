import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useForm, SubmitHandler } from 'react-hook-form';
import libraryApi from '../../api/libraryApi.ts';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

interface ErrorFields {
  email?: string[];
  password?: string[];
  name?: string[];
}

interface LoginErrorResponseData extends ErrorFields {
  errors: ErrorFields;
  message: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      await libraryApi.get('/sanctum/csrf-cookie');
      await libraryApi.post('/register', data);
      navigate('/app/dashboard');
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const responseData = e.response?.data as LoginErrorResponseData;
        if (responseData?.errors) {
          Object.keys(responseData.errors).forEach((error) =>
            setError(error as keyof ErrorFields, {
              type: 'custom',
              message: responseData.message,
            })
          );
        }
      }
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col xs={3}>
            <h1>RegisterPage.tsx</h1>
            <p>Lorum Ipsem Page Content Here</p>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-center mb-5">
          <Col xs={4}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Full Name"
                  {...register('name', { required: true })}
                />
                <div className="validation-text">
                  <Form.Text className="text-danger">
                    {errors.name && errors.name.message}
                    {errors.name?.type == 'required' &&
                      'The name field is required'}
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  {...register('email', { required: true })}
                />
                <div className="validation-text">
                  <Form.Text className="text-danger">
                    {errors.email && errors.email.message}
                    {errors.email?.type == 'required' &&
                      'The email field is required'}
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group controlId="password">
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
              <Form.Group controlId="password_confirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register('password_confirmation', { required: true })}
                />
                <div className="validation-text">
                  <Form.Text className="text-danger">
                    {errors.password_confirmation &&
                      errors.password_confirmation.message}
                    {errors.password_confirmation?.type == 'required' &&
                      'The confirm password field is required'}
                  </Form.Text>
                </div>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
