import { useEffect, useRef, useState } from 'react'

function useThrottle<T>(value: T, delay: number = 300): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastExecuted = useRef<number>(Date.now())
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const now = Date.now()
    const timeSinceLastExecution = now - lastExecuted.current

    if (timeSinceLastExecution >= delay) {
      // 立即执行
      setThrottledValue(value)
      lastExecuted.current = now
    } else {
      // 延迟执行剩余时间
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value)
        lastExecuted.current = Date.now()
      }, delay - timeSinceLastExecution)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, delay])

  return throttledValue
}

export default useThrottle
