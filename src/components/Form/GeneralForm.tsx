import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ParsedFormProperty, FormSchemaType } from "./types";

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
                return <input type="text" {...methods.register(field.name)} />;
            case 'FormTextArea':
                return <textarea {...methods.register(field.name)} />;
            case 'FormSelect':
                return (
                    <select {...methods.register(field.name)}>
                        {field.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            default:
                return null;
        }
    };

    console.log('Form Config JSON:', theFormArray)
    return (
        <FormProvider {...methods}>
            <form>
                {/* Add form fields here using methods */}
                {theFormArray.map((field) => (
                    <div key={field.name}>
                        <label>{field.label}</label>
                        {renderInputField(field)}
                        {field.description && <p>{field.description}</p>}
                    </div>
                ))}
            </form>
        </FormProvider>
    )
}

export default GeneralForm;
