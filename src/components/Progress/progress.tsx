import React from 'react'
import type { themeType } from '../Icons/icon'
import './_style.scss'

export interface ProgressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  styles?: React.CSSProperties
  theme?: themeType
}

const Progress: React.FC<ProgressProps> = (props) => {
  const { percent, strokeHeight = 15, showText = true, styles, theme = 'primary' } = props
  return (
    <div className="jasmine-progress-bar" style={styles}>
      <div className="jasmine-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`jasmine-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

export default Progress
