import type { FormProperty, ParsedFormProperty } from "../types";

export const useFormReadySchema = (
    schemaProperties: Record<string, FormProperty>,
    requiredFields?: string[]
) => {
    console.log('PROPERTIES:', schemaProperties);
    // convert formConfig to an array of properties
    // * anyOf * is a special case, if it exists, we need to use the first value
    // it happens when the field is nullable in schema
    const formReadySchema: ParsedFormProperty[] = Object.entries(schemaProperties).flatMap(
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

             // If the property is of type 'object', create a divider and extract its children
            if (property.type === 'object' && property.properties) {
                const divider: ParsedFormProperty = {
                    name,
                    label: name.charAt(0).toUpperCase() + name.slice(1),
                    inputType: 'FormDivider',
                    type: 'object',
                };
                const endDivider: ParsedFormProperty = {
                    name: `${name}End`,
                    label: 'end',
                    inputType: 'FormDivider',
                    type: 'object',
                };

                const childProperties = Object.entries(property.properties).map(([childName, childProperty]) => {
                    // Handle `anyOf` for child properties
                    if (childProperty.anyOf && Array.isArray(childProperty.anyOf) && childProperty.anyOf.length > 0) {
                        return {
                            ...childProperty.anyOf[0],
                            name: `${name}.${childName}`, // Use dot notation for nested properties
                            required: requiredFields?.includes(childName) ?? false,
                        };
                    }

                    // Default case for child properties
                    return {
                        ...childProperty,
                        name: `${name}.${childName}`, // Use dot notation for nested properties
                        required: requiredFields?.includes(childName) ?? false,
                    };
                });

                // Return the divider and child properties as separate entries
                return [divider, ...childProperties, endDivider];
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