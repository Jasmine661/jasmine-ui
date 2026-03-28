import React, { useState, useEffect, memo } from 'react'
import type { ElementType } from 'react'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

// 动画五个状态
type AnimationStatus = 'enter' | 'enter-active' | 'enter-done' | 'exit' | 'exit-active'

export interface TransitionProps {
  animation?: AnimationName
  in?: boolean
  timeout?: number
  classNames?: string
  children: React.ReactNode
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
  tag?: ElementType
  wrapper?: boolean
}

const nextFrame = (fn: () => void) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn)
  })
}

const Transition = memo<TransitionProps>((props) => {
  const {
    animation = 'zoom-in-top',
    classNames = animation,
    children,
    in: inProp = false,
    timeout = 200,
    onEnter,
    onEntered,
    onExit,
    onExited,
    tag = 'div',
    wrapper,
    ...restProps
  } = props

  // 是否渲染到 DOM
  const [display, setDisplay] = useState(inProp)
  // 当前动画状态
  const [status, setStatus] = useState<AnimationStatus>(inProp ? 'enter-done' : 'exit')

  useEffect(() => {
    let timeoutId: number | null = null

    if (inProp) {
      // === 进入动画 ===
      setDisplay(true)
      setStatus('enter')
      onEnter?.()

      // 下一帧 → enter-active
      nextFrame(() => {
        setStatus('enter-active')
      })

      timeoutId = window.setTimeout(() => {
        onEntered?.()
      }, timeout)
    } else {
      // === 退出动画 ===
      setStatus('exit')
      onExit?.()

      nextFrame(() => {
        setStatus('exit-active')
      })

      timeoutId = window.setTimeout(() => {
        setDisplay(false)
        onExited?.()
      }, timeout)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [inProp, timeout, onEnter, onEntered, onExit, onExited])

  const className = `${classNames} ${animation}-${status}`

  if (!display) return null

  const Tag = tag as ElementType

  return (
    <Tag className={className} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </Tag>
  )
})

Transition.displayName = 'Transition'

export default Transition
