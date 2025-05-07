import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { z } from 'zod';
import GeneralForm from '../GeneralForm';
import { describe, it, expect, vi } from 'vitest';
import type { FormSchemaType } from '../types';

describe('GeneralForm with Zod v4', () => {
  it('shows validation errors', async () => {
    // Create a minimal schema and form config for testing
    const testSchema = z.object({
      name: z.string().min(1, 'Name is required'),
    });
    
    const formConfig: FormSchemaType = {
      label: 'Test Form',
      description: 'A test form for validation',
      type: "object" as const, // Add "as const" to ensure it's treated as a literal
      properties: {
        name: {
          label: 'Name',
          description: 'Enter your name',
          inputType: 'FormInput',
          type: 'string'
        }
      },
      defaultValues: {
        name: '',
      }
    };
    
    // Spy on console.error to check for ZodErrors
    const consoleErrorSpy = vi.spyOn(console, 'error');
    
    render(
      <GeneralForm 
        formZodSchema={testSchema} 
        formConfig={formConfig} 
      />
    );
    
    // Find submit button (removing unused nameInput variable)
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    // Submit with empty field to trigger validation
    fireEvent.click(submitButton);
    
    // Check if error message appears in the UI
    await waitFor(() => {
      expect(screen.queryByText('Name is required')).toBeInTheDocument();
    });
    
    // Check if ZodError was logged to console
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});