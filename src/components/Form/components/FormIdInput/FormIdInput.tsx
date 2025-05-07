import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormIdInputProps {
  name: string;
  label: string;
  description?: string;
}

const FormIdInput = ({ name, label, description }: FormIdInputProps) => {
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
          error={!!errors[field.name]}
          helperText={errors[field.name] ? String(errors[field.name]?.message) : description}
          variant="outlined"
        />
      )}
    />
  );
};

export default FormIdInput;

