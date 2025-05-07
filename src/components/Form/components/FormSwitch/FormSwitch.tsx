import { FormControl, FormControlLabel, FormHelperText, Switch } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormSwitchProps {
  name: string;
  label: string;
  description?: string;
}

const FormSwitch = ({ name, label, description }: FormSwitchProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field } }) => (
        <FormControl margin="normal" error={!!errors[name]}>
          <FormControlLabel
            control={
              <Switch
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

export default FormSwitch;
