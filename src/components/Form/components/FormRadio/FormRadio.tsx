import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormRadioProps {
  name: string;
  label: string;
  description?: string;
  options: Array<{ label: string; value: string }>;
}

const FormRadio = ({ name, label, description, options }: FormRadioProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl margin="normal" error={!!errors[name]}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            {...field}
            aria-label={name}
            row
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <FormHelperText>
            {errors[name] ? String(errors[name]?.message) : description}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormRadio;
