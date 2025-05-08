import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"; // Comment out or remove this line
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
        defaultValues: formConfig.defaultValues,
        mode: "onBlur",
    });
    const { renderInputField } = useFormRender()
    const { formReadySchema: schema } = useFormReadySchema(formConfig.properties, formConfig.required);

    const { 
        handleSubmit,  
    } = methods;


    const onSubmit = handleSubmit(
        (data) => {
            console.log('Form submitted with data:', data);
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
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};

export default GeneralForm;
