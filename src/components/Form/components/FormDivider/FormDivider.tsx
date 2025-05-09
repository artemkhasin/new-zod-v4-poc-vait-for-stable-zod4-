import Divider from '@mui/material/Divider';

interface FormDividerProps {
  label?: string;
}

const FormDivider = ({label}: FormDividerProps) => {
  return (
    <>
      {label === 'end' ? <Divider sx={{ mb: 4 }} /> : <Divider>{label}</Divider>}
    </>
  )
}

export default FormDivider
