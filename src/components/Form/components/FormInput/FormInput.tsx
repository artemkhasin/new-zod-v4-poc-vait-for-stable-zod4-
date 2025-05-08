import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormInputProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
}

const FormInput = ({ name, label, description, required }: FormInputProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          margin="normal"
          error={!!errors[name]}
          helperText={errors[name] ? String(errors[name]?.message) : description}
          variant="outlined"
          required={required}  
        />
      )}
    />
  );
};

export default FormInput;
