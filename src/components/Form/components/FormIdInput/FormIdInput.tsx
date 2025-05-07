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
          error={!!errors[name]}
          helperText={errors[name] ? String(errors[name]?.message) : description}
          variant="outlined"
          InputProps={{
            sx: { fontFamily: 'monospace' }
          }}
        />
      )}
    />
  );
};

export default FormIdInput;
