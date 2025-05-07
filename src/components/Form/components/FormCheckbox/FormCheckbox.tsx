import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormCheckboxProps {
  name: string;
  label: string;
  description?: string;
}

const FormCheckbox = ({ name, label, description }: FormCheckboxProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field } }) => (
        <FormControl error={!!errors[name]} margin="normal">
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
            label={label}
          />
          <FormHelperText>
            {errors[name] ? String(errors[name]?.message) : description}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormCheckbox;
