import React, { useState } from 'react'
import classNames from 'classnames'

export type AlertType = 'success' | 'warning' | 'error' | 'info'

export interface AlertProps {
  type?: AlertType
  title: string
  description?: string
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
    <div className={classes}>
      <div className="Alert-text">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      {closable && (
        <svg
          className="Alert-close"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          onClick={handleClose}
          style={{ cursor: 'pointer' }}
        >
          <path d="M0 0h1024v1024H0z" fill="#FF0033" fillOpacity="0"></path>
          <path
            d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z"
            fill="#111111"
          ></path>
        </svg>
      )}
    </div>
  )
}

export default Alert
