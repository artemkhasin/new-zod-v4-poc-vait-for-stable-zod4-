import type { ParsedFormProperty } from "../types";
import { FormInputTypesList } from "../types";
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
    FormDivider
} from "../components";


export const useFormRender = () => {

    const renderInputField = (field: ParsedFormProperty) => {
        switch (field.inputType) {
            case FormInputTypesList.FormInput:
                return <FormInput name={field.name} label={field.label} description={field.description} required={field.required} />;
            case FormInputTypesList.FormIdInput:
                return <FormIdInput name={field.name} label={field.label} description={field.description} required={field.required} />;
            case FormInputTypesList.FormTextArea:
                return <FormTextArea name={field.name} label={field.label} description={field.description} required={field.required} />;
            case FormInputTypesList.FormDateInput:
                return <FormDateInput name={field.name} label={field.label} description={field.description} />;
            case FormInputTypesList.FormTagsInput:
                return <FormTagsInput name={field.name} label={field.label} description={field.description} />;
            case FormInputTypesList.FormDataTypeSelect:
                return <FormDataTypeSelect 
                    name={field.name} 
                    label={field.label} 
                    description={field.description} 
                    options={field.options || []} 
                />;
            case FormInputTypesList.FormSelect:
                return <FormSelect 
                    name={field.name} 
                    label={field.label} 
                    description={field.description} 
                    options={field.options || []} 
                />;
            case FormInputTypesList.FormCheckbox:
                return <FormCheckbox name={field.name} label={field.label} description={field.description} />;
            case FormInputTypesList.FormRadio:
                return <FormRadio 
                    name={field.name} 
                    label={field.label} 
                    description={field.description} 
                    options={field.options || []} 
                />;
            case FormInputTypesList.FormSwitch:
                return <FormSwitch name={field.name} label={field.label} description={field.description} />;
            case FormInputTypesList.FormDivider:
                return <FormDivider label={field.label} />;
            default:
                return null;
        }
    };

    return {
        renderInputField
    }
};
