import './App.css'
import GeneralForm from './components/Form/GeneralForm'
import { myZodSampleSchema, myFormConfig } from './schemas'

function App() {
  // const defaultValues = {};

  const formConfigParsed = JSON.parse(JSON.stringify(myFormConfig));
  console.log('Parsed Form Config:', formConfigParsed);

  return (
    <>
      <div>
        <h1>React Hook Form with Zod</h1>
        <p>Check the console for the form config JSON.</p>
        <GeneralForm
          formZodSchema={myZodSampleSchema}
          formConfig={formConfigParsed}
          // defaultValues={defaultValues}
        />
      </div>
    </>
  )
}

export default App
