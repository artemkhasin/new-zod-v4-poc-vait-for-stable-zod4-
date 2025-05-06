import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { FormProperty } from "../../types";

interface IGeneralFormProps {
    formZodSchema: z.ZodObject<z.ZodRawShape>;
    formConfig: z.core.JSONSchema.BaseSchema;
}

const GeneralForm = (props: IGeneralFormProps) => {
    const { formZodSchema, formConfig } = props;
    const methods = useForm({
        resolver: zodResolver(formZodSchema),
        defaultValues: {}
    });
    console.log('Form Config JSON #$#%$:', JSON.stringify(formConfig, null, 2))

    const theForm: Record<string, FormProperty> = formConfig.properties as Record<string, FormProperty>;

    console.log('Form Config JSON:', theForm)
    return (
        <FormProvider {...methods}>
            <form>
                {/* Add form fields here using methods */}
            </form>
        </FormProvider>
    )
}

export default GeneralForm;
