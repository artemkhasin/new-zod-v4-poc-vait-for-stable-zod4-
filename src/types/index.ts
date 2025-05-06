export interface FormProperty {
    label: string;
    description: string;
    inputType: string
    type: 'string' | 'array' | 'number' | 'boolean' | 'object';
    minLength?: number;
    maxLength?: number;
    items?: {
        type: string;
    };
}

export type FormSchemaType = {
    label: string;
    description: string;
    type: 'object';
    properties: Record<string, FormProperty>;
    required?: string[];
}

export type ParsedFormProperty = FormProperty & {
    name: string;
}