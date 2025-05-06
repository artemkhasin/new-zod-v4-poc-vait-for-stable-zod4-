import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ParsedFormProperty, FormSchemaType } from "../../types";

interface IGeneralFormProps {
    formZodSchema: z.ZodObject<z.ZodRawShape>;
    formConfig: FormSchemaType;
}

const GeneralForm = (props: IGeneralFormProps) => {
    const { formZodSchema, formConfig } = props;
    const methods = useForm({
        resolver: zodResolver(formZodSchema),
        defaultValues: {}
    });
    const theForm: ParsedFormProperty[] = Object.entries(formConfig.properties).map(
        ([name, property]) => ({
            ...property,
            name
        })
    );

    

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
