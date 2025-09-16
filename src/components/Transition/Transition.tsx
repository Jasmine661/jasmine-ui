import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import type { ElementType } from 'react'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

// 动画状态：准备进入，进入动画中，完全进入，准备退出，退出动画中
type AnimationStatus = 'enter' | 'enter-active' | 'exit' | 'exit-active' | 'enter-done'

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

// 使用 memo 进行浅比较优化
const Transition = memo<TransitionProps>((props) => {
  const {
    animation = 'zoom-in-top', // 动画类型，决定类名前缀
    classNames = animation,
    children,
    in: inProp = false, // 控制组件是否进入动画,是将prop中的in属性重构并命名为inProp
    timeout = 200, // 控制动画时长
    // 以下是生命周期钩子函数，可以让使用者在动画的不同阶段执行自定义逻辑，不影响动画本身运行
    onEnter,
    onEntered,
    onExit,
    onExited,
    tag = 'div',
    wrapper, // 为了防止被包裹的组件有自身的transition样式
    ...restProps
  } = props

  // 控制组件是否在DOM中显示，是整个动画生命周期是否进入DOM的核心开关
  const [isVisible, setIsVisible] = useState(inProp)
  // 控制当前动画状态
  const [status, setStatus] = useState<AnimationStatus>(inProp ? 'enter' : 'exit')

  // 添加防抖逻辑，
  const [debouncedInProp, setDebouncedInProp] = useState(inProp)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInProp(inProp)
    }, 16) // 一帧的时间

    return () => clearTimeout(timer)
  }, [inProp])

  // 使用 useCallback 缓存回调函数
  const handleEnter = useCallback(() => {
    onEnter?.()
  }, [onEnter])

  const handleEntered = useCallback(() => {
    onEntered?.()
  }, [onEntered])

  const handleExit = useCallback(() => {
    onExit?.()
  }, [onExit])

  const handleExited = useCallback(() => {
    onExited?.()
  }, [onExited])

  // 使用防抖后的值
  useEffect(() => {
    // 进入动画逻辑
    if (debouncedInProp) {
      setIsVisible(true)
      setStatus('enter')
      handleEnter()
    }
  }, [debouncedInProp, handleEnter])

  useEffect(() => {
    // 进入动画逻辑
    if (debouncedInProp && isVisible) {
      const timer = window.setTimeout(() => {
        setStatus('enter-active')
        handleEntered()
      }, timeout)
      
      return () => clearTimeout(timer)
    }
  }, [debouncedInProp, isVisible, timeout, handleEntered])

  useEffect(() => {
    // 退出动画逻辑
    if (!debouncedInProp && isVisible) {
      setStatus('exit')
      handleExit()
      setStatus('exit-active')
      
      const timer = window.setTimeout(() => {
        setIsVisible(false)
        handleExited()
      }, timeout)
      
      return () => clearTimeout(timer)
    }
  }, [debouncedInProp, isVisible, timeout, handleExit, handleExited])

  const className = useMemo(() => {
    return `${classNames} ${animation}-${status}`
  }, [classNames, animation, status])

  const renderedChildren = useMemo(() => {
    if (wrapper) {
      return <div>{children}</div>
    }
    return children
  }, [wrapper, children])

  if (!isVisible) return null 

  const Tag = tag as ElementType

  return (
    <Tag className={className} {...restProps}>
      {renderedChildren}
    </Tag>
  )
}, (prevProps, nextProps) => {
  // 自定义比较函数
  return (
    prevProps.in === nextProps.in &&
    prevProps.timeout === nextProps.timeout &&
    prevProps.animation === nextProps.animation &&
    prevProps.classNames === nextProps.classNames &&
    prevProps.wrapper === nextProps.wrapper
  )
})

Transition.displayName = 'Transition'

export default Transition
