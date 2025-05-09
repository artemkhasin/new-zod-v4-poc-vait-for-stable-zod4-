import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box, Button, Stack } from "@mui/material";
import type { ParsedFormProperty } from '../../types';

interface FormStepperProps {
    schema: ParsedFormProperty[]
    steps?: string[];
    activeStep?: number;    
    setActiveStep?: React.Dispatch<React.SetStateAction<number>>;
    onSubmit: () => void;
    trigger: (name?: string | string[]) => Promise<boolean>;
    children: React.ReactNode;
}

const FormStepper = ({ 
    schema, 
    steps, 
    activeStep = 0,
    setActiveStep, 
    onSubmit, 
    trigger, 
    children 
}: FormStepperProps) => {

    const handleNext = async () => {
        if (!steps) {
            onSubmit();
            return;
        }

        // Validate fields for the current step
        const isValid = await trigger(
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
        } else if (setActiveStep) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0 && setActiveStep) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };
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
            <Box display="flex" flexDirection="column" alignItems="center">
                <Stack spacing={2} width="100%">
                    {children}
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
        </>
  )
}

export default FormStepper
