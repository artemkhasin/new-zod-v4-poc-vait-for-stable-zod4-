import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"; // Comment out or remove this line
// import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { zodV4Resolver } from "../../utils/zodV4Resolver"; // Import your custom resolver
import { z } from "zod";
import { Button, Stack } from "@mui/material";
import type { FormSchemaType } from "./types";
import { useFormRender } from "./hooks/useFormRender";
import { useFormReadySchema } from "./hooks/useFormReadySchema";

interface IGeneralFormProps {
    formZodSchema: z.ZodObject<z.ZodRawShape>;
    formConfig: FormSchemaType;
}

const GeneralForm = (props: IGeneralFormProps) => {
    const { formZodSchema, formConfig } = props;
    const methods = useForm({
        // @ts-expect-error: it is a custom resolver
        resolver: zodV4Resolver(formZodSchema), // Use your custom resolver here
        // resolver: standardSchemaResolver(formZodSchema), // Use the standard schema resolver
        defaultValues: formConfig.defaultValues,
        mode: "onBlur",
    });
    const { renderInputField } = useFormRender()
    const { formReadySchema: schema } = useFormReadySchema(formConfig.properties, formConfig.required);

    const { 
        handleSubmit,
        reset  
    } = methods;


    const onSubmit = handleSubmit(
        (data) => {
            console.log('Form submitted with data:', data);
            reset();
        },
        (validationErrors) => {
            console.error('Validation Errors:', validationErrors);
        }
    );
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <Stack spacing={2}>
                    {schema.map((field) => (
                        <div key={field.name}>
                            {renderInputField(field)}
                        </div>
                    ))}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 2 }} 
                        // onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};

export default GeneralForm;

// while official zodResolver is not supporting zod v4, we can use this custom resolver
// import { zodResolver } from "@hookform/resolvers/zod";
// or we can use standardSchemaResolver
// import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";

// when warped in the <form> and set the required on inputs it will not allow to submit 
// until all required inputs are filled
// and only then it will do a validation
// without form tags just putting onSubmit to button click will validate all inputs