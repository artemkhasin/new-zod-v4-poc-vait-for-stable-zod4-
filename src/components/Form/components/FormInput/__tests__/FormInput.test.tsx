import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormInput from '../FormInput';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { zodV4Resolver } from '../../../../../utils/zodV4Resolver'; // Import your custom resolver
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('FormInput with Zod v4', () => {
  it('displays validation errors from Zod', async () => {
    const schema = z.object({
      inputField: z.string().min(1, 'Input is required'),
    });
    
    // Create a wrapper component that provides the form context
    const TestWrapper = () => {
      const methods = useForm<{
        inputField: string;
      }>({
        // @ts-expect-error: it is a custom resolver
        resolver: zodV4Resolver(schema),
        defaultValues: { inputField: '' },
        mode: 'onBlur', // Match your actual form configuration
      });
      
      const onSubmit = methods.handleSubmit((data) => console.log(data));
      
      return (
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <FormInput 
              name="inputField" 
              label="Input Field" 
              description="Test input field"
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };
    
    render(<TestWrapper />);
    
    // Get the input
    const input = screen.getByLabelText(/input field/i);
    
    // Trigger validation by focusing, typing nothing, and blurring
    fireEvent.focus(input);
    fireEvent.blur(input);
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Input is required')).toBeInTheDocument();
    });

    // Also test form submission to check if errors are captured in formState
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    // Check again for the error message
    await waitFor(() => {
      expect(screen.getByText('Input is required')).toBeInTheDocument();
    });
  });
});