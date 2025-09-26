import { useImperativeHandle, useMemo, useCallback, forwardRef } from 'react'
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

const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { children, name, initialValues, onFinish, onFinishFailed } = props
  
  // 使用 useMemo 缓存 useForm 的配置
  const formConfig = useMemo(() => ({
    initialValues,
    onFinish,
    onFinishFailed
  }), [initialValues, onFinish, onFinishFailed])
  
  const formData = useForm(formConfig)
  const { form, fields, dispatch, submitForm, validateField } = formData
  
  useImperativeHandle(ref, useCallback(() => {
    return {
      ...formData,
      // 排除不需要暴露的属性
      form: undefined,
      fields: undefined
    }
  }, [formData]))

  // 使用 useMemo 缓存 Context 值，减少子组件重新渲染
  const passedContext = useMemo(() => ({
    dispatch,
    fields, 
    initialValues, 
    validateField
  }), [dispatch, fields, initialValues, validateField])

  // 使用 useMemo 缓存表单样式类名
  const formClassName = useMemo(() => 'jasmine-form', [])

  // 使用 useMemo 缓存子组件渲染
  const childrenNode = useMemo(() => {
    if(typeof children === 'function') {
      return children(form)
    }
    return children
  }, [children, form])

  // 使用 useMemo 缓存表单属性
  const formProps = useMemo(() => ({
    name,
    className: formClassName,
    onSubmit: submitForm,
    'data-testid': 'form'
  }), [name, formClassName, submitForm])

  return (
    <form {...formProps}>
      <FormContext.Provider value={passedContext}>
        {childrenNode}
      </FormContext.Provider>
    </form>
  )
})

Form.displayName = 'Form'

export default Form
