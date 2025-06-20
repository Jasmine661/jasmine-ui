import React, { useState, useEffect } from 'react'
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

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    animation = 'zoom-in-top', // 动画类型，决定类名前缀
    classNames = animation,
    children,
    in: inProp = false, // 控制组件是否进入动画
    timeout = 200, // 控制动画时长
    // 以下是生命周期钩子函数，可以让使用者在动画的不同阶段执行自定义逻辑，不影响动画本身运行
    onEnter,
    onEntered,
    onExit,
    onExited,
    tag: Tag = 'div',
    wrapper, // 为了防止被包裹的组件有自身的transition样式
    ...restProps
  } = props

  // 控制组件是否在DOM中显示，是整个动画生命周期是否进入DOM的核心开关
  const [isVisible, setIsVisible] = useState(inProp)
  // 控制当前动画状态
  const [status, setStatus] = useState<AnimationStatus>(inProp ? 'enter' : 'exit')

  // 控制动画的核心逻辑
  useEffect(() => {
    let enterTimer: number | undefined
    let doneTimer: number | undefined
    if (inProp) {
      // inProp为true，显示动画流程
      setIsVisible(true) // 显示元素
      setStatus('enter') // 设置状态为准备进入
      onEnter?.() // 调用onEnter钩子
      // enterTimer = window.setTimeout(() => setStatus('enter'), 30) // 进入动画开始，强制让浏览器渲染一次enter状态，避免闪烁
      setStatus('enter')
      doneTimer = window.setTimeout(() => {
        setStatus('enter-active') // 进入动画后
        onEntered?.()
      }, timeout)
    } else if (isVisible) {
      // inProp为false，隐藏动画流程
      setStatus('exit') // 设置状态为准备退出
      onExit?.() // 调用onExit钩子
      // enterTimer = window.setTimeout(() => {
      //   setStatus('exit-active') // 退出动画开始
      // }, 30)
      setStatus('exit-active')
      doneTimer = window.setTimeout(() => {
        setIsVisible(false) // 隐藏元素
        onExited?.()
      }, timeout)
    }

    // 组件卸载时，清除定时器
    return () => {
      if (enterTimer) clearTimeout(enterTimer)
      if (doneTimer) clearTimeout(doneTimer)
    }
  }, [inProp, isVisible, timeout, onEnter, onEntered, onExit, onExited])

  if (!isVisible) return null

  return (
    <Tag className={`${classNames} ${animation}-${status}`} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </Tag>
  )
}

Transition.displayName = 'Transition'

export default Transition
