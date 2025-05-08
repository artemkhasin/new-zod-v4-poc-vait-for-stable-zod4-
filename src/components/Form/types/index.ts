export type FormSelectorOptionsType = {
    label: string;
    value: string;
}

export type FormProperty = {
    label: string;
    description: string;
    inputType: string
    type: 'string' | 'array' | 'number' | 'boolean' | 'object';
    options?: FormSelectorOptionsType[] | [];
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    items?: {
        type: string;
    };
    anyOf?: [FormProperty, { type: null }];
}

export type FormSchemaType = {
    label: string;
    description: string;
    type: 'object';
    properties: Record<string, FormProperty>;
    required?: string[];
    defaultValues?: Record<string, unknown>;
}

export type ParsedFormProperty = FormProperty & {
    name: string;
}

export const FormInputTypesList = {
    FormInput: 'FormInput',
    FormIdInput: 'FormIdInput',
    FormTextArea: 'FormTextArea',
    FormDateInput: 'FormDateInput',
    FormTagsInput: 'FormTagsInput',
    FormDataTypeSelect: 'FormDataTypeSelect',
    FormSelect: 'FormSelect',
    FormCheckbox: 'FormCheckbox',
    FormRadio: 'FormRadio',
    FormSwitch: 'FormSwitch',
    FormFile: 'FormFile'
} as const;

// For type usage:
export type FormInputType = keyof typeof FormInputTypesList;
