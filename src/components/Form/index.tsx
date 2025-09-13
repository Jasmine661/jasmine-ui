import type { FC } from 'react'
import Form from './form'
import FormItem from './formItem'
import type { FormProps } from './form'
import type { FormItemProps } from './formItem'

export type IFormComponent = FC<FormProps> & {
  Item: FC<FormItemProps>
}

const TransForm = Form as IFormComponent
TransForm.Item = FormItem

export default TransForm
