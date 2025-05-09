import React, { useState } from 'react'
import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"; // Comment out or remove this line
// import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { zodV4Resolver } from "../../utils/zodV4Resolver"; // Import your custom resolver
import { z } from "zod";
import { Button, Stack } from "@mui/material";
import type { FormSchemaType } from "./types";
import { useFormRender } from "./hooks/useFormRender";
import { useFormReadySchema } from "./hooks/useFormReadySchema";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box } from "@mui/material";

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

    const handleNext = async () => {
    if (!steps) {
        onSubmit();
        return;
    }

    // Validate fields for the current step
    const isValid = await methods.trigger(
        schema
            .filter((field) => field.step === activeStep + 1)
            .map((field) => field.name) // Get the names of the fields for the current step
    );

    if (!isValid) {
        console.error("Validation errors in the current step");
        return; // Prevent moving to the next step if validation fails
    }

    if (activeStep === steps.length - 1) {
        // If it's the last step, submit the form
        onSubmit();
    } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
};

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    // Filter fields for the current step
    const fieldsForCurrentStep = steps ? schema.filter((field) => field.step === activeStep + 1) : schema;
    
    return (
        <>
            {steps && steps.length > 0 && (
                <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 4 }}>
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            )}
            <FormProvider {...methods}>
                {/* <form onSubmit={onSubmit}> */}
                    <Box display="flex" flexDirection="column" alignItems="center">
                    <Stack spacing={2} width="100%">
                        {/* this is where form is rendered by the schema */}
                        {fieldsForCurrentStep.map((field) => (
                            <div key={field.name}>{renderInputField(field)}</div>
                        ))}
                        {/* --------------------------------------------- */}
                        <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
                            {steps && steps.length > 0 && activeStep > 0 && (
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleBack}
                                    sx={{ mt: 2 }}
                                    disabled={activeStep === 0}
                                    fullWidth
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                sx={{ mt: 2 }}
                                fullWidth
                            >
                                {steps && steps.length > 0 && steps[activeStep] !== steps[steps.length - 1]
                                    ? "Next"
                                    : "Submit"}
                            </Button>
                        </Box>
                    </Stack>
                </Box>
                {/* </form> */}
            </FormProvider>
        </>
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