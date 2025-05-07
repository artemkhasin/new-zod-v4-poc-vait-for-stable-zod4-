// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from 'zod';
import { type Resolver, type FieldError, type FieldErrors } from 'react-hook-form';

/**
 * Custom resolver for React Hook Form to work with Zod v4 beta
 */
export function zodV4Resolver<T extends z.ZodType>(
  schema: T
): Resolver<T> {
  return async (values) => {
    try {
      // Attempt to parse/validate the values with Zod
      const validatedData = await schema.safeParseAsync(values);
      
      // If validation succeeds, return the validated values
      if (validatedData.success) {
        return {
          values: validatedData.data,
          errors: {}
        };
      }
      
      // If validation fails, format the errors for React Hook Form
      const formattedErrors: FieldErrors = {};
      
      // Process each Zod error and convert to RHF format
      for (const issue of validatedData.error.issues) {
        const path = issue.path.join('.');
        if (!path) continue;
        
        // Create field error object
        const fieldError: FieldError = {
          type: issue.code,
          message: issue.message
        };
        
        // Add to errors object using path
        formattedErrors[path] = fieldError;
      }
      
      return {
        values: {},
        errors: formattedErrors
      };
    } catch (error) {
      // Handle any unexpected errors
      console.error("ZodV4Resolver unexpected error:", error);
      return {
        values: {},
        errors: {
          root: {
            type: "validation",
            message: error instanceof Error ? error.message : "Validation failed"
          }
        }
      };
    }
  };
}