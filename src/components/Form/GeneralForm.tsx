import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Stack } from "@mui/material";
import type { ParsedFormProperty, FormSchemaType } from "./types";
import {
  FormInput,
  FormIdInput,
  FormTextArea,
  FormDateInput,
  FormTagsInput,
  FormDataTypeSelect,
  FormSelect,
  FormCheckbox,
  FormRadio,
  FormSwitch,
} from "./components";

import { useEffect } from "react";

interface IGeneralFormProps {
    formZodSchema: z.ZodObject<z.ZodRawShape>;
    formConfig: FormSchemaType;
}

const GeneralForm = (props: IGeneralFormProps) => {
    const { formZodSchema, formConfig } = props;
    const methods = useForm({
        resolver: zodResolver(formZodSchema),
        defaultValues: formConfig.defaultValues,
        mode: "onBlur",
    });

    // convert formConfig to an array of properties
    const theFormArray: ParsedFormProperty[] = Object.entries(formConfig.properties).map(
        ([name, property]) => ({
            ...property,
            name
        })
    );

    // DEBUGGING: Manually test the resolver
    useEffect(() => {
        if (!formZodSchema) return;

        const testValidation = async () => {
            // Simulate form data that you know will fail based on your ZodError.issues
            const testData = {
                id: "!", // Invalid: "ID can only contain letters, numbers, dashes and underscores"
                code: "",  // Invalid: "Code is required" (too_small, minimum 5)
                description: "", // Invalid: "Description is required" (too_small, minimum 1)
                createdAt: "invalid-date-string", // Invalid: "Created At must be a valid date"
                dataType: null, // Invalid: "Invalid input" (assuming this maps to a field expecting a specific type)
                // Add other fields from your schema, possibly with valid default values
                // if they are not part of the errors you're testing, to ensure the
                // overall object shape matches formZodSchema.
            };

            console.log("Manually testing resolver with data:", testData);
            try {
                // The resolver function itself is what zodResolver(formZodSchema) returns.
                // It expects (values, context, options)
                const resolverFn = zodResolver(formZodSchema);
                const resolverResult = await resolverFn(
                    testData, 
                    {}, // context (can usually be empty for Zod)
                    { criteriaMode: "all", fields: {}, names: [] } // options
                );
                console.log('Manual Resolver Result:', resolverResult);
                // Expected: resolverResult.errors should be populated, e.g.,
                // { id: { type: 'invalid_format', message: '...' }, code: { type: 'too_small', message: '...' } ... }
            } catch (e) {
                console.error('Error manually calling resolver:', e);
            }
        };

        testValidation();
    }, [formZodSchema]); // Re-run if schema changes (or just once on mount for testing)


    const { handleSubmit, formState: { errors } } = methods;

    console.log('Form Errors:', errors);

    const renderInputField = (field: ParsedFormProperty) => {
        switch (field.inputType) {
            case 'FormInput':
                return <FormInput name={field.name} label={field.label} description={field.description} />;
            case 'FormIdInput':
                return <FormIdInput name={field.name} label={field.label} description={field.description} />;
            case 'FormTextArea':
                return <FormTextArea name={field.name} label={field.label} description={field.description} />;
            case 'FormDateInput':
                return <FormDateInput name={field.name} label={field.label} description={field.description} />;
            case 'FormTagsInput':
                return <FormTagsInput name={field.name} label={field.label} description={field.description} />;
            case 'FormDataTypeSelect':
                return <FormDataTypeSelect 
                    name={field.name} 
                    label={field.label} 
                    description={field.description} 
                    options={field.options || []} 
                />;
            case 'FormSelect':
                return <FormSelect 
                    name={field.name} 
                    label={field.label} 
                    description={field.description} 
                    options={field.options || []} 
                />;
            case 'FormCheckbox':
                return <FormCheckbox name={field.name} label={field.label} description={field.description} />;
            case 'FormRadio':
                return <FormRadio 
                    name={field.name} 
                    label={field.label} 
                    description={field.description} 
                    options={field.options || []} 
                />;
            case 'FormSwitch':
                return <FormSwitch name={field.name} label={field.label} description={field.description} />;
            default:
                return null;
        }
    };

    const onSubmit = handleSubmit(
        (data) => {
            console.log('Form submitted with data:', data);
        },
        (validationErrors) => {
            console.error('Validation Errors:', validationErrors);
        }
    );

    console.log('Form Config Array:', theFormArray);
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <Stack spacing={2}>
                    {theFormArray.map((field) => (
                        <div key={field.name}>
                            {renderInputField(field)}
                        </div>
                    ))}
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};

export default GeneralForm;
