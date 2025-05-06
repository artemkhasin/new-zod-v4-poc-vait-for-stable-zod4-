import './App.css'
import GeneralForm from './components/Form/GeneralForm'
import { myZodSampleSchema, myFormConfig } from './schemas'

function App() {
  // const defaultValues = {};

  return (
    <>
      <div>
        <h1>React Hook Form with Zod</h1>
        <p>Check the console for the form config JSON.</p>
        <GeneralForm
          formZodSchema={myZodSampleSchema}
          formConfig={myFormConfig}
          // defaultValues={defaultValues}
        />
      </div>
    </>
  )
}

export default App
