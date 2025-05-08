import type { FormProperty, ParsedFormProperty } from "../types";

export const useFormReadySchema = (schemaProperties: Record<string, FormProperty>) => {
    console.log('PROPERTIES:', schemaProperties);
    // convert formConfig to an array of properties
    // * anyOf * is a special case, if it exists, we need to use the first value
    // it happens when the field is nullable in schema
    const formReadySchema: ParsedFormProperty[] = Object.entries(schemaProperties).map(
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

    console.log('Form Config Array:', formReadySchema);


    return { formReadySchema };
}