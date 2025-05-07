import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormSelectProps {
  name: string;
  label: string;
  description?: string;
  options: Array<{ label: string; value: string }>;
}

const FormSelect = ({ name, label, description, options }: FormSelectProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl 
          fullWidth 
          margin="normal" 
          error={!!errors[name]}
        >
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            labelId={`${name}-label`}
            label={label}
            value={field.value || ''}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {errors[name] ? String(errors[name]?.message) : description}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
