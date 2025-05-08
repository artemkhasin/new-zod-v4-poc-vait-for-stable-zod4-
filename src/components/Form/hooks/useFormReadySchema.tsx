import type { FormProperty, ParsedFormProperty } from "../types";

export const useFormReadySchema = (
    schemaProperties: Record<string, FormProperty>,
    requiredFields?: string[]
) => {
    console.log('PROPERTIES:', schemaProperties);
    // convert formConfig to an array of properties
    // * anyOf * is a special case, if it exists, we need to use the first value
    // it happens when the field is nullable in schema
    const formReadySchema: ParsedFormProperty[] = Object.entries(schemaProperties).map(
        ([name, property]) => {

            // Determine if the field is required
            const isRequired = requiredFields?.includes(name) ?? false;

            // If property has anyOf and it's an array, use the first value
            if (property.anyOf && Array.isArray(property.anyOf) && property.anyOf.length > 0) {
                return {
                    ...property.anyOf[0],
                    name,
                    required: isRequired,
                };
            }
            return {
                ...property,
                name,
                required: isRequired,
            };
        }
    );

    console.log('%c FORM CONFIG ARRAY:', 'color: yellow; font-weight: bold', formReadySchema);


    return { formReadySchema };
}