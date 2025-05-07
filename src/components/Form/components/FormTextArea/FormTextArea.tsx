import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormTextAreaProps {
  name: string;
  label: string;
  description?: string;
  rows?: number;
}

const FormTextArea = ({ name, label, description, rows = 4 }: FormTextAreaProps) => {
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
          multiline
          rows={rows}
          margin="normal"
          error={!!errors[name]}
          helperText={errors[name] ? String(errors[name]?.message) : description}
          variant="outlined"
        />
      )}
    />
  );
};

export default FormTextArea;
