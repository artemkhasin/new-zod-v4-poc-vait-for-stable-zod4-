import type { ParsedFormProperty } from "../types";
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
} from "../components";


export const useFormRender = () => {

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

    return {
        renderInputField
    }
};
