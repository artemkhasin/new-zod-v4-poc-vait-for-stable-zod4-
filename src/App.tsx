import { Button } from '@mui/material';
import './App.css'
import GeneralForm from './components/Form/GeneralForm'
import { 
  myZodSampleSchema, 
  myFormConfig, 
  profileSchema,
  profileFormConfig, 
} from './schemas'
import { useState } from 'react'

function App() {
  const [useProfileSchema, setUseProfileSchema] = useState(false);

  // ---- Fist Form ----
  console.log('%c jsonSchema USER:', 'color: red; font-weight: bold;', myFormConfig);

  // ---- Second Form ----
  console.log('%c jsonSchema PROF:', 'color: orange; font-weight: bold;', profileFormConfig);

  const formZodSchema = useProfileSchema ? profileSchema : myZodSampleSchema;
  const formConfigParsed = JSON.parse(
    JSON.stringify(useProfileSchema ? profileFormConfig : myFormConfig)
  );
  console.log('%c Parsed Form Config:', 'color: purple; font-weight: bold;', formConfigParsed);

  return (
    <>
      <div>
        <h1>React Hook Form with Zod</h1>
        <Button onClick={() => setUseProfileSchema(!useProfileSchema)}>
          Switch to {useProfileSchema ? 'User Form' : 'Profile Form'}
        </Button>
        <p>Check the console for the form config JSON.</p>
        <GeneralForm
          formZodSchema={formZodSchema}
          formConfig={formConfigParsed}
        />
      </div>
    </>
  )
}

export default App
