import React, { useMemo } from 'react'
import type { themeType } from '../Icons/icon'
import './_style.scss'

export interface ProgressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  styles?: React.CSSProperties
  theme?: themeType
}

const Progress: React.FC<ProgressProps> = React.memo((props) => {
  const { percent, strokeHeight = 15, showText = true, styles, theme = 'primary' } = props
  
  // 使用 useMemo 缓存样式计算
  const outerStyle = useMemo(() => ({ height: `${strokeHeight}px` }), [strokeHeight])
  const innerStyle = useMemo(() => ({ width: `${percent}%` }), [percent])
  const innerClassName = useMemo(() => `jasmine-progress-bar-inner color-${theme}`, [theme])
  
  return (
    <div className="jasmine-progress-bar" style={styles}>
      <div className="jasmine-progress-bar-outer" style={outerStyle}>
        <div className={innerClassName} style={innerStyle}>
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
})

Progress.displayName = 'Progress'

export default Progress
