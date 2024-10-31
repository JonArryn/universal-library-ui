import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useForm, SubmitHandler } from 'react-hook-form';
import libraryApi from '../api/libraryApi.ts';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await libraryApi.get('/sanctum/csrf-cookie', { data });
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <Row className="mb-5">
          <Col>
            <h1>RegisterPage.tsx</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <Form.Text className="text-danger">
                    This field is required
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
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
              <Form.Group className="mb-3" controlId="password">
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
              <Form.Group className="mb-3" controlId="confirmPass">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register('confirmPassword', { required: true })}
                />
                {errors.confirmPassword && (
                  <Form.Text className="text-danger">
                    This field is required
                  </Form.Text>
                )}
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
