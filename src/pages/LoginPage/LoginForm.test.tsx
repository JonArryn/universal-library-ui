import { describe, it, expect, vi, Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import AuthProvider from '../../providers/AuthProvider.tsx';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm.tsx';
import { setupServer } from 'msw/node';
import { useNavigate } from 'react-router-dom';

const responses = {
    failedLogin: {
        message: 'Credentials Do Not Match. Could not log you in.',
    },
    successLogin: {
        user: {
            id: 1,
            name: 'Jon Arryn',
            email: 'development@arryn.net',
        },
    },
};

const credentials = {
    email: 'hello@arryn.net',
    password: 'password',
};

const server = setupServer(
    http.get(`${import.meta.env.VITE_SERVER_URL}/sanctum/csrf-cookie`, () =>
        HttpResponse.text('')
    ),
    http.post(`${import.meta.env.VITE_API_URL}/login`, () => {
        return HttpResponse.json(responses.failedLogin);
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const Component = function () {
    return (
        <>
            <AuthProvider>
                <MemoryRouter>
                    <LoginForm />
                </MemoryRouter>
            </AuthProvider>
        </>
    );
};

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('Form Submit Button', () => {
    it('renders correctly', async () => {
        render(<Component />);

        const formHeader = await screen.findByText('Sign In To Your Account');
        expect(formHeader).toBeVisible();

        const emailInput = await screen.findByLabelText('Email');
        expect(emailInput).toBeVisible();

        const passwordInput = await screen.findByLabelText('Password');
        expect(passwordInput).toBeVisible();

        const submitButton = await screen.findByRole('button');
        expect(submitButton).toHaveTextContent('Sign In');
    });
    it('returns required fields when form is submitted with blank fields', async () => {
        render(<Component />);
        const submitButton = await screen.findByRole('button');
        expect(submitButton).toHaveTextContent('Sign In');
        await userEvent.click(submitButton);
        expect(screen.findByText('The Email field is required'));
        expect(screen.findByText('The Password field is required'));

        screen.debug();
    });
    it('returns bad credentials message when credentials are invalid', async () => {
        server.use(
            http.post('http://localhost:8000/api/login', () => {
                return HttpResponse.json(responses.failedLogin, {
                    status: 400,
                });
            })
        );
        render(<Component />);

        const emailInput = await screen.findByLabelText('Email');
        await userEvent.click(emailInput);
        await userEvent.type(emailInput, credentials.email);
        expect(emailInput).toHaveValue(credentials.email);

        const passwordInput = await screen.findByLabelText('Password');
        await userEvent.click(passwordInput);
        await userEvent.type(passwordInput, credentials.password);
        expect(passwordInput).toHaveValue(credentials.password);

        const submitButton = await screen.findByRole('button');
        expect(submitButton).toHaveTextContent('Sign In');
        await userEvent.click(submitButton);

        const errorMessage = await waitFor(() =>
            screen.findByText('Credentials Do Not Match. Could not log you in.')
        );

        screen.debug();
        expect(errorMessage).toBeVisible();
    });
    it('navigates to the dashboard when login is successful', async () => {
        server.use(
            http.post('http://localhost:8000/api/login', () => {
                return HttpResponse.json(responses.successLogin, {
                    status: 200,
                });
            })
        );
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        render(<Component />);

        const emailInput = await screen.findByLabelText('Email');
        await userEvent.click(emailInput);
        await userEvent.type(emailInput, credentials.email);
        expect(emailInput).toHaveValue(credentials.email);

        const passwordInput = await screen.findByLabelText('Password');
        await userEvent.click(passwordInput);
        await userEvent.type(passwordInput, credentials.password);
        expect(passwordInput).toHaveValue(credentials.password);

        const submitButton = await screen.findByRole('button');
        expect(submitButton).toHaveTextContent('Sign In');
        await userEvent.click(submitButton);

        expect(mockNavigate).toHaveBeenCalledWith('/app/dashboard');
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
});
