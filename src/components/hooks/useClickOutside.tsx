import { useEffect, type RefObject } from 'react'

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: (event: MouseEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      callback(event)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, callback])
}

export default useClickOutside
