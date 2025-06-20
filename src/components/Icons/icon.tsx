import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import classNames from 'classnames'

library.add(fas)

type themeType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: themeType
  className?: string
  style?: React.CSSProperties
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, style, ...resetProps } = props
  const classes = classNames('jasmine-icon', className, {
    [`icon-${theme}`]: theme,
  })
  return <FontAwesomeIcon className={classes} style={style} {...resetProps} />
}

Icon.displayName = 'Icon'
export default Icon
