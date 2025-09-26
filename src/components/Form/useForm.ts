import { useCallback, useMemo } from 'react'
import useStore from './useStore'
import type { FormState } from './useStore'
import type { ValidateError } from 'async-validator'

export interface UseFormProps {
  initialValues?: Record<string, any>
  onFinish?: (values: Record<string, any>) => void
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void
}

export interface UseFormReturn {
  form: FormState
  fields: Record<string, any>
  submitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  resetFields: () => void
  getFieldValue: (name: string) => any
  getFieldsValue: () => Record<string, any>
  setFieldValue: (name: string, value: any) => void
  validateField: (name: string) => Promise<void>
  validateAllFields: () => Promise<{ isValid: boolean; errors: Record<string, ValidateError[]>; values: Record<string, any> }>
  isSubmitting: boolean
}

const useForm = ({ initialValues, onFinish, onFinishFailed }: UseFormProps = {}): UseFormReturn & { dispatch: any } => {
  const { form, fields, dispatch, ...restProps } = useStore(initialValues)
  const { getFieldValue, getFieldsValue, setFieldValue, validateField, validateAllFields, isSubmitting } = restProps

  // 使用 useCallback 缓存提交处理函数
  const submitForm = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    await restProps.submitForm(onFinish, onFinishFailed)
  }, [restProps, onFinish, onFinishFailed])

  // 使用 useCallback 缓存重置函数
  const resetFields = useCallback(() => {
    restProps.resetFields()
  }, [restProps])

  // 使用 useMemo 缓存返回值，减少不必要的重新创建
  const returnValue = useMemo(() => ({
    form,
    fields,
    dispatch,
    submitForm,
    resetFields,
    getFieldValue,
    getFieldsValue,
    setFieldValue,
    validateField,
    validateAllFields,
    isSubmitting,
  }), [
    form,
    fields,
    dispatch,
    submitForm,
    resetFields,
    getFieldValue,
    getFieldsValue,
    setFieldValue,
    validateField,
    validateAllFields,
    isSubmitting,
  ])

  return returnValue
}

export default useForm
