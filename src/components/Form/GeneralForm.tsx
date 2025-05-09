import { useState } from 'react'
import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"; // Comment out or remove this line
// import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { zodV4Resolver } from "../../utils/zodV4Resolver"; // Import your custom resolver
import { z } from "zod";
import type { FormSchemaType } from "./types";
import { useFormRender } from "./hooks/useFormRender";
import { useFormReadySchema } from "./hooks/useFormReadySchema";
import { FormStepper } from './components';

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
    const steps = formConfig.steps || undefined;
    const [activeStep, setActiveStep] = useState(0);

    const { 
        handleSubmit,
        reset, 
        trigger  
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

    // Filter fields for the current step
    const fieldsForCurrentStep = steps ? schema.filter((field) => field.step === activeStep + 1) : schema;
    
    return (
        <FormStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            schema={schema}
            steps={steps}
            onSubmit={onSubmit}
            trigger={trigger}
        >
            <FormProvider {...methods}>
                {/* this is where form is rendered by the schema */}
                {fieldsForCurrentStep.map((field) => (
                    <div key={field.name}>{renderInputField(field)}</div>
                ))}
                {/* --------------------------------------------- */}
            </FormProvider>
        </FormStepper>  
                    
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