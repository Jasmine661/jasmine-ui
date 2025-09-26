import classNames from 'classnames'
import React, { useContext, useEffect, useMemo, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { FormContext } from './formContext'
import type { CustomRule } from './useStore'

// 根据 valuePropName 确定默认值类型
const getDefaultValue = (valuePropName: string) => {
  switch (valuePropName) {
    case 'checked':
      return false
    case 'value':
      return ''
    default:
      return ''
  }
}

// T: type(FormItemProps), K: keys of T(name,children...) 对于自己的代码相对有些冗余，可以去掉(仅供补充知识点)
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
// type TestType = SomeRequired<FormItemProps, 'getValueFromEvent'>
export interface FormItemProps {
  name: string
  children: ReactNode
  label?: string
  required?: boolean
  // value的属性名称
  valuePropName?: string
  // 更新值的回调属性名称
  trigger?: string
  // 怎样从事件对象里获取真正的值
  rules?: CustomRule[]
  validateTrigger?: string
  getValueFromEvent?: (event: any) => any
}

const FormItem: FC<FormItemProps> = React.memo((props) => {
  const {
    children,
    label,
    required,
    name,
    valuePropName = 'value',
    trigger = 'onChange',
    rules = [],
    validateTrigger = 'onBlur',
    getValueFromEvent = (e: any) => e.target.value,
  } = props as SomeRequired<FormItemProps, 'valuePropName' | 'trigger' | 'getValueFromEvent'>
  
  const { dispatch, fields, validateField, initialValues } = useContext(FormContext)
  const fieldState = fields[name]
  
  // 使用 useMemo 缓存计算结果
  const rowClass = useMemo(() => classNames('jasmine-row', {
    'jasmine-row-no-label': !label,
  }), [label])
  
  // fieldState可能是undefined，React的受控组件要求value必须是确定的值
  const value = fieldState?.value ?? initialValues?.[name] ?? getDefaultValue(valuePropName)
  const errors = fieldState?.errors || []
  
  // 使用 useMemo 缓存状态计算
  const isRequired = useMemo(() => 
    required ?? rules?.some(rule => 
      (typeof rule !== 'function') && rule.required
    ) ?? false, 
    [required, rules]
  )
  
  const hasError = useMemo(() => errors.length > 0, [errors.length])

  // 使用 useCallback 缓存事件处理函数
  const onValueUpdate = useCallback((e: any) => {
    const value = getValueFromEvent(e)
    // console.log('new value', value)
    dispatch({ type: 'onValueUpdate', name, value })
  }, [getValueFromEvent, dispatch, name])

  const onValueValidate = useCallback(async () => {
    await validateField(name)
  }, [validateField, name])
  // 使用 useMemo 缓存 controlProps 对象
  const controlProps = useMemo(() => {
    const props: Record<string, any> = {}
    props[valuePropName] = value
    props[trigger] = onValueUpdate
    if (rules.length > 0) {
      props[validateTrigger] = onValueValidate
    }
    return props
  }, [valuePropName, value, trigger, onValueUpdate, rules.length, validateTrigger, onValueValidate])
  
  // 使用 useMemo 缓存子组件处理逻辑
  const returnChildNode = useMemo(() => {
    // 2 获取 children 数组的第一个元素
    const childList = React.Children.toArray(children)
    // 没有子组件
    if (childList.length === 0) {
      console.error('No child element found in Form.Item, please provide one form component')
      return null
    }
    // 子组件大于一个
    if (childList.length > 1) {
      console.warn('Only support one child element in Form.Item, others will be omitted')
    }
    // 不是 ReactElement 的子组件
    if (!React.isValidElement(childList[0])) {
      console.error('Child component is not a valid React Element')
      return childList[0]
    }
    const child = childList[0]
    // 3 cloneElement，混合这个child 以及 手动的属性列表（仅处理 ReactElement）
    return React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement, controlProps)
      : child
  }, [children, controlProps])

  // 优化 useEffect 依赖数组，避免不必要的重新执行
  const currentField = fields[name]
  useEffect(() => {
    // 之前没有检查这个name，导致dispatch会更新fields，导致useEffect陷入死循环
    if (!currentField) {
      const initialValue = initialValues?.[name] ?? getDefaultValue(valuePropName)
      dispatch({
        type: 'addField',
        name,
        value: {
          label,
          name,
          value: initialValue,
          rules: rules || [],
          isValid: true,
          errors: [],
        },
      })
    }
  }, [dispatch, label, name, valuePropName, rules, initialValues, currentField])
  
  return (
    <div className={rowClass}>
      {label && (
        <div className="jasmine-form-item-label">
          <label 
            title={label} 
            className={classNames({
              'jasmine-form-item-required': isRequired
            })}
          >
            {label}
          </label>
        </div>
      )}
      <div className="jasmine-form-item">
        <div className={classNames('jasmine-form-item-control', {
          'jasmine-form-item-has-error': hasError
        })}>
          {returnChildNode}
        </div>
        {hasError && (
          <div className="jasmine-form-item-explain">
            {errors.map((error, index) => (
              <span key={index} className="jasmine-form-item-error-message">
                {error.message}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

FormItem.displayName = 'FormItem'

export default FormItem
