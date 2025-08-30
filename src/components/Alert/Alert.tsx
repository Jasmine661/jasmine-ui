import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icons/icon'
import Transition from '../Transition/Transition'

export type AlertType = 'success' | 'warning' | 'error' | 'info'

export interface AlertProps {
  type?: AlertType
  title?: string
  description: string
  onClose?: () => void
  closable?: boolean
}

const Alert: React.FC<AlertProps> = (props) => {
  const { type = 'info', title, description, onClose, closable } = props

  const [visible, setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
    onClose?.()
  }

  const classes = classNames('alert', {
    [`alert-${type}`]: type,
    'alert-closable': closable,
  })

  if (!visible) return null // 不显示

  return (
    <Transition in={visible} timeout={300} animation="zoom-in-top">
      <div className={classes}>
        <div className="Alert-text">
          {title && <strong>{title}</strong>}
          {description && <p>{description}</p>}
        </div>
        {closable && <Icon icon="close" onClick={handleClose} />}
      </div>
    </Transition>
  )
}

export default Alert
