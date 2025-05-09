# React Hook Form with Zod v4 Beta and Dynamic Form Rendering POC

This project demonstrates a proof-of-concept for building dynamic forms using **React Hook Form**, **Zod v4 beta** for schema definition and validation, and **Material UI** for components. The forms are dynamically rendered based on a configuration derived from a Zod schema.

## Project Overview

The core idea is to define a single source of truth for the form's structure, validation, and UI hints (like labels, input types) using a Zod schema. This schema is then transformed into a JSON schema-like configuration that drives the `GeneralForm` component to render the appropriate input fields.

## Key Features

1. **Zod v4 Beta Integration**:
   * The project uses Zod v4 beta, which introduces improved validation features and better async validation handling.
   * A custom resolver (`zodV4Resolver`) is implemented to integrate Zod v4 beta with React Hook Form.

2. **Dynamic Form Rendering**:
   * Forms are rendered dynamically based on a configuration derived from a Zod schema. This configuration includes metadata such as labels, input types, and validation rules.

3. **Stepper-Based Multi-Step Forms**:
   * The project includes a stepper component (`FormStepper`) that allows forms to be split into multiple steps, with validation occurring at each step.

## Data Flow

### 1. **Schema Definition**

* Defined in `src/schemas/index.ts`.
* Example schemas include:
  * `myZodSampleSchema`: A schema for a user form.
  * `profileSchema`: A schema for a profile form.
* Each field in the schema includes metadata (`meta`) for UI rendering:
  * `label`: Display label for the field.
  * `description`: Helper text for the field.
  * `inputType`: Specifies the type of input component (e.g., `FormInput`, `FormDateInput`).
  * `options`: For select or radio inputs, an array of `{ label, value }` objects.
  * `defaultValues`: Default values for the form fields.

### 2. **Schema Conversion**

* The Zod schema is converted into a JSON schema-like configuration using `z.toJSONSchema`.
* This configuration (`formConfig`) contains the structure, default values, and UI hints for rendering the form dynamically.

### 3. **Form Initialization**

* In `src/components/Form/GeneralForm.tsx`:
  * `formZodSchema`: The Zod schema is passed to the `zodV4Resolver` for validation.
  * `formConfig`: The JSON schema-like configuration is used to render the form dynamically.

### 4. **Dynamic Form Rendering**

* The `useFormReadySchema` hook processes the `formConfig` and converts it into an array of `ParsedFormProperty` objects.
* The `useFormRender` hook maps each `ParsedFormProperty` to the appropriate input component (e.g., `FormInput`, `FormDateInput`).
* The `renderInputField` function dynamically renders these components based on their `inputType`.

### 5. **Multi-Step Form with Stepper**

* The `FormStepper` component (`src/components/Form/components/FormStepper/FormStepper.tsx`) manages the multi-step form flow:
  * Displays step labels and navigation buttons (`Back`, `Next`, `Submit`).
  * Validates fields for the current step using `trigger` from React Hook Form.
  * Prevents navigation to the next step if validation fails.
  * Submits the form on the last step.

### 6. **Form Submission**

* The `handleSubmit` function from React Hook Form is used to handle form submission.
* Validation errors are captured and displayed using the `formState.errors` object.

## Example Flow

1. **Schema Definition (`src/schemas/index.ts`)**:
   * Define a Zod schema with validation rules and metadata.
   * Convert the schema to a JSON schema-like configuration using `z.toJSONSchema`.

2. **App Component (`src/App.tsx`)**:
   * Pass the Zod schema (`formZodSchema`) and the JSON schema-like configuration (`formConfig`) to the `GeneralForm` component.

3. **GeneralForm Component (`src/components/Form/GeneralForm.tsx`)**:
   * Initialize React Hook Form with the custom `zodV4Resolver` and default values from `formConfig`.
   * Use `useFormReadySchema` and `useFormRender` to dynamically render input fields based on `formConfig`.

4. **Stepper Integration**:
   * If the form has multiple steps, the `FormStepper` component manages navigation and validation for each step.

5. **Form Submission**:
   * On form submission, the validated data is logged or processed, and errors are displayed if validation fails.

## Known Issues

1. **Custom Resolver Integration**:
   * The custom `zodV4Resolver` works with Zod v4 beta but may require updates as Zod v4 reaches stable release.

2. **Validation Feedback**:
   * Ensure that validation errors are correctly propagated to the `formState.errors` object for proper UI feedback.

## Running the Project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Run tests:

   ```bash
   npm run test
   ```

## File Structure

```
src/
├── components/
│   ├── Form/
│   │   ├── GeneralForm.tsx
│   │   ├── hooks/
│   │   │   ├── useFormRender.tsx
│   │   │   ├── useFormReadySchema.tsx
│   │   ├── components/
│   │   │   ├── FormStepper/
│   │   │   │   ├── FormStepper.tsx
│   │   │   ├── ...
│   │   ├── __tests__/
│   │       ├── GeneralForm.test.tsx
├── schemas/
│   ├── index.ts
├── utils/
│   ├── zodV4Resolver.ts
└── App.tsx
```

## Dependencies

* **React Hook Form**: For form state management.
* **Zod v4 Beta**: For schema definition and validation.
* **Material UI**: For UI components.
