import React, { forwardRef, useImperativeHandle } from 'react'
import type { ReactNode } from 'react'
import './_style.scss'
import useStore from './useStore'
import type { FormState } from './useStore'
import { FormContext, type IFormContext } from './formContext'
import type { ValidateError } from 'async-validator'

export type RenderProps = (form: FormState) => ReactNode
// 
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form' >

export interface FormProps {
  children?: ReactNode | RenderProps
  name?: string
  initialValues?: Record<string, any>
  // onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  onFinish?: (values: Record<string,any>) => void
  onFinishFailed?: (values: Record<string,any>,errors: Record<string,ValidateError[]>) => void
  ref?: React.Ref<HTMLFormElement>
}

const From = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { children, name, initialValues, onFinish, onFinishFailed } = props
  const { form, fields, dispatch, ...restProps } = useStore(initialValues)
  const { validateField, validateAllFields } = restProps
  useImperativeHandle(ref, () => {
    return {
      ...restProps
    }
  })
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
  let childrenNode: ReactNode
  if(typeof children === 'function') {
    childrenNode = children(form)
  }else {
    childrenNode = children
  }
  return (
    <>
      <form name={name} className="jasmine-form" onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>{childrenNode}</FormContext.Provider>
      </form>
      <div>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(form)}</pre>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(fields)}</pre>
      </div>
    </>
  )
})

export default From
