import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormSubmitButton from './FormSubmitButton.tsx';

const Component = function () {
    return (
        <>
            <FormSubmitButton submitButtonText={'Hello'} />
        </>
    );
};
describe('Form Submit Button', () => {
    it('renders correctly', () => {
        render(<Component />);
        screen.debug();

        const element = screen.getByRole('button');
        expect(element).toHaveTextContent('Hello');
    });
});
