import { expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { z } from 'zod';

// Add testing-library matchers - fixed import
expect.extend({});

// Run cleanup after each test
afterEach(() => {
  cleanup();
});

// Configure Zod logger to help debug validation issues
// z.setErrorMap((issue, ctx) => {
//   console.error('ZOD ERROR:', { issue, ctx });
//   return { message: ctx.defaultError };
// });

const customRender = (ui: React.ReactElement, options = {}) => {
  return render(ui, { ...options });
};

export * from '@testing-library/react';
export { customRender as render };