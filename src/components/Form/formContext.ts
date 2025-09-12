import { createContext } from 'react'
import type useStore from './useStore'
import type { FormProps } from './form'

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'validateField'
> &
  Pick<FormProps, 'initialValues'>
export const FormContext = createContext<IFormContext>({} as IFormContext)
