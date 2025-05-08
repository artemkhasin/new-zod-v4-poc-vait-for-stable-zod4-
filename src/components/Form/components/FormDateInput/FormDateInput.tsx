import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormDateInputProps {
  name: string;
  label: string;
  description?: string;
}

const FormDateInput = ({ name, label, description }: FormDateInputProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          value={field.value ?? ""} // Convert null to an empty string
          onChange={(e) => field.onChange(e.target.value || null)} // Convert empty string back to null
          label={label}
          type="date"
          fullWidth
          margin="normal"
          error={!!errors[name]}
          helperText={errors[name] ? String(errors[name]?.message) : description}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
};

export default FormDateInput;
