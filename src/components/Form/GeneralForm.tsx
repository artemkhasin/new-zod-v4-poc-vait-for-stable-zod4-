import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"; // Comment out or remove this line
import { zodV4Resolver } from "../../utils/zodV4Resolver"; // Import your custom resolver
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

interface IGeneralFormProps {
    formZodSchema: z.ZodObject<z.ZodRawShape>;
    formConfig: FormSchemaType;
}

const GeneralForm = (props: IGeneralFormProps) => {
    const { formZodSchema, formConfig } = props;
    const methods = useForm({
        // @ts-expect-error: it is a custom resolver
        resolver: zodV4Resolver(formZodSchema), // Use your custom resolver here
        defaultValues: formConfig.defaultValues,
        mode: "onBlur",
    });

    console.log('prpperties:', formConfig.properties);

    // convert formConfig to an array of properties
    // anyOf is a special case, if it exists, we need to use the first value
    // it happens when the field is nullable in schema
    const theFormArray: ParsedFormProperty[] = Object.entries(formConfig.properties).map(
        ([name, property]) => {
            // If property has anyOf and it's an array, use the first value
            if (property.anyOf && Array.isArray(property.anyOf) && property.anyOf.length > 0) {
                return {
                    ...property,
                    ...property.anyOf[0],
                    name
                };
            }
            return {
                ...property,
                name
            };
        }
    );

    const { 
        handleSubmit, 
        // formState: { errors } 
    } = methods;

    // console.log('Form Errors:', errors);

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
