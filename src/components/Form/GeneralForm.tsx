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

    const handleSubmit = methods.handleSubmit((data) => {
        console.log('Form submitted with data:', data);
    });

    console.log('Form Config Array:', theFormArray);
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit}>
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
