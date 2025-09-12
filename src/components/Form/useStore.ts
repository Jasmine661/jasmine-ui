import { useState, useReducer, useCallback } from 'react'
import Schema from 'async-validator'
import type { RuleItem, ValidateError } from 'async-validator'
import { each, mapValues } from 'lodash-es'

// 以支持系统定义函数的表单验证
export type CustomRuleFunction = ({ getFieldValue }: { getFieldValue: (name: string) => any }) => RuleItem
export type CustomRule = RuleItem | CustomRuleFunction

// 表单组件的核心状态管理对象，用来储存每个表单字段的详细信息
export interface FieldDetail {
  name: string
  value: string
  rules: CustomRule[]
  isValid: boolean
  errors: ValidateError[]
}

// 字段状态
export interface FieldState {
  [key: string]: FieldDetail
}

export interface ValidateErrorType {
  errors: ValidateError[]
  fields: Record<string, ValidateError[]>
}

export interface FormState {
  // 表单是否验证通过
  isValid: boolean
  isSubmitting: boolean
  errors: Record<string, ValidateError[]>
}

export interface FieldAction {
  type: 'addField' | 'onValueUpdate' | 'updateValidateResult'
  name: string
  value: any
  rules?: CustomRule[]
}

function fieldsReducer(state: FieldState, action: FieldAction): FieldState {
  switch (action.type) {
    // 组件的初始化
    case 'addField':
      return {
        ...state,
        [action.name]: { ...action.value },
      }
    // 表单项的值更新
    case 'onValueUpdate':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.value,
        },
      }
    // 表单项的验证结果更新
    case 'updateValidateResult': {
      const { isValid, errors } = action.value
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          isValid,
          errors,
        },
      }
    }

    default:
      return state
  }
}

function useStore(initialValues?: Record<string, any>) {
  const [form, setForm] = useState<FormState>({ isValid: true,isSubmitting: false,errors:{} })
  const [fields, dispatch] = useReducer(fieldsReducer, {})
  // 用于获取单个表单项的值
  const getFieldValue = useCallback((key: string) => {
    return fields[key]?.value
  }, [fields])
  // 用于获取所有表单项的值 {'username': 'jasmine','password': '123456'}
  const getFieldsValue = () => {
    return mapValues(fields, field => field.value)
  }
  // 用于设置单个表单项的值
  const setFieldValue = (name: string, value: any) => {
    if(fields[name]) {
    dispatch({ type: 'onValueUpdate', name: name, value })

    }
  }
  // 用于重置表单的内容
  const resetFields = () => {
    if(initialValues) {
      each(initialValues,(value,name) => {
        if(fields[name]) {
          dispatch({ type: 'onValueUpdate', name, value })
        }
      })
    }
  }
  
  // 将 CustomRule 转换为 RuleItem
  const transformRules = useCallback((rules: CustomRule[]) => {
    return rules.map(rule => {
      if(typeof rule === 'function') {
        const calledRule = rule({getFieldValue})
        return calledRule
      } else {
        return rule
      }
    })
  }, [getFieldValue])

  // 用于单个表单验证
  const validateField = async (name: string) => {
    const { value, rules } = fields[name]
    const afterRules = transformRules(rules)
    // 创建描述对象
    const descriptor = {
      [name]: afterRules,
    }
    // 创建值对象
    const valueMap = {
      [name]: value,
    }
    // 创建验证器
    const validator = new Schema(descriptor)
    let isValid = true
    let errors: ValidateError[] = []
    try {
      // 验证
      await validator.validate(valueMap)
    } catch (e) {
      isValid = false
      const err = e as any
      // console.log('验证错误详情:', err)
      // console.log('错误信息:', err.errors)
      // console.log('字段信息:', err.fields)
      // async-validator 的错误结构是 err.errors
      errors = err.errors || []
    } finally {
      // console.log('验证结果 - isValid:', isValid, 'errors:', errors)
      dispatch({ type: 'updateValidateResult', name, value: { isValid, errors } })
    }
  }
  // 用于整个表单验证
  const validateAllFields = useCallback(async () => {
    // 开始验证，设置提交状态
    setForm(prev => ({ ...prev, isSubmitting: true }))
    
    let isValid = true
    let errors: Record<string, ValidateError[]> = {}
    
    // 构建所有字段的值映射
    const valueMap = mapValues(fields, field => field.value)
    
    // 构建所有字段的验证描述符
    const descriptor = mapValues(fields, field => transformRules(field.rules))
    
    // 创建验证器并执行验证
    const validator = new Schema(descriptor)
    
    try {
      await validator.validate(valueMap)
    } catch (e) {
      isValid = false
      const err = e as ValidateErrorType
      errors = err.fields || {}
    }
    
    // 更新所有字段的验证状态
    each(fields, (value, name) => {
      if (errors[name]) {
        const itemErrors = errors[name]
        dispatch({ type: 'updateValidateResult', name, value: { isValid: false, errors: itemErrors } })
      } else if (value.rules.length > 0 && !errors[name]) {
        dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: [] } })
      }
    })
    
    // 验证完成，设置提交状态为 false
    setForm(prev => ({ ...prev, isSubmitting: false, isValid, errors }))
    return { isValid, errors, values: valueMap }
    
  }, [fields, transformRules, dispatch])

  // submit提交优化
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitForm = useCallback(
    async (
      onFinish?: (values: Record<string, any>) => void, 
      onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void
    ) => {
    setIsSubmitting(true)  // 开始提交
    try {
      const { isValid, errors, values } = await validateAllFields()
      if (isValid) {
        onFinish?.(values)
      } else {
        onFinishFailed?.(values, errors)
      }
    } finally {
      setIsSubmitting(false)  // 无论成功失败都结束提交状态
    }
  }, [validateAllFields])

  return {
    fields,
    form,
    isSubmitting,
    submitForm,
    setForm,
    dispatch,
    getFieldValue,
    getFieldsValue,
    setFieldValue,
    resetFields,
    validateField,
    validateAllFields,
  }
}

export default useStore
