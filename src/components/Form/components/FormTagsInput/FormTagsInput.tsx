import { Autocomplete, Chip, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormTagsInputProps {
  name: string;
  label: string;
  description?: string;
}

const FormTagsInput = ({ name, label, description }: FormTagsInputProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <Autocomplete
          {...field}
          multiple
          freeSolo
          options={[]}
          value={value || []}
          onChange={(_, newValue) => {
            onChange(newValue);
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip 
                label={option} 
                {...getTagProps({ index })} 
                key={index}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              fullWidth
              margin="normal"
              error={!!errors[name]}
              helperText={errors[name] ? String(errors[name]?.message) : description}
              variant="outlined"
            />
          )}
        />
      )}
    />
  );
};

export default FormTagsInput;
