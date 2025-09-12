import React from 'react'
import type { FC, ReactNode } from 'react'
import './_style.scss'
import useStore from './useStore'
import { FormContext, type IFormContext } from './formContext'
import type { ValidateError } from 'async-validator'

export interface FormProps {
  children?: ReactNode
  name?: string
  initialValues?: Record<string, any>
  // onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  onFinish?: (values: Record<string,any>) => void
  onFinishFailed?: (values: Record<string,any>,errors: Record<string,ValidateError[]>) => void
}

const From: FC<FormProps> = (props) => {
  const { children, name, initialValues, onFinish, onFinishFailed } = props
  const { form, fields, dispatch, validateField, validateAllFields } = useStore()
  const passedContext: IFormContext = { dispatch, fields, initialValues, validateField }
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { isValid, errors, values } = await validateAllFields()
    
    if (isValid) {
      onFinish?.(values)
    } else {
      onFinishFailed?.(values, errors)
    }
  }
  return (
    <>
      <form name={name} className="jasmine-form" onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>{children}</FormContext.Provider>
      </form>
      <div>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(form)}</pre>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(fields)}</pre>
      </div>
    </>
  )
}

export default From
