import React, { useImperativeHandle, useMemo } from 'react'
import type { ReactNode } from 'react'
import './_style.scss'
import useForm from './useForm'
import type { FormState } from './useStore'
import { FormContext } from './formContext'
import type { ValidateError } from 'async-validator'

export type RenderProps = (form: FormState) => ReactNode

export type IFormRef = Omit<ReturnType<typeof useForm>, 'fields' | 'form' >

export interface FormProps {
  children?: ReactNode | RenderProps
  name?: string
  initialValues?: Record<string, any>
  onFinish?: (values: Record<string,any>) => void
  onFinishFailed?: (values: Record<string,any>,errors: Record<string,ValidateError[]>) => void
}

const Form = (props: FormProps & { ref?: React.Ref<IFormRef> }) => {
  const { ref, children, name, initialValues, onFinish, onFinishFailed } = props
  const formData = useForm({
    initialValues,
    onFinish,
    onFinishFailed
  })
  const { form, fields, dispatch, submitForm, validateField } = formData
  
  useImperativeHandle(ref, () => {
    return {
      ...formData,
      // 排除不需要暴露的属性
      form: undefined,
      fields: undefined
    }
  })

  const passedContext = useMemo(() => ({
    dispatch,
    fields, 
    initialValues, 
    validateField
  }), [dispatch, fields, initialValues, validateField])

  let childrenNode: ReactNode
  if(typeof children === 'function') {
    childrenNode = children(form)
  }else {
    childrenNode = children
  }
  return (
    <>
      <form name={name} className="jasmine-form" onSubmit={submitForm} data-testid="form">
        <FormContext.Provider value={passedContext}>{childrenNode}</FormContext.Provider>
      </form>
    </>
  )
}

export default Form
