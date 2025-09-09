import React, { useState } from 'react'
import type { DragEvent } from 'react'
import classNames from 'classnames'
export interface DraggerProps {
  onFile: (files: FileList) => void
  children?: React.ReactNode
}

export const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('jasmine-uploader-dragger', {
    'is-dragger': dragOver,
  })

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      onFile(files)
    }
  }
  return (
    <div
      className={classes}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children || <span>拖拽文件到此上传</span>}
    </div>
  )
}

export default Dragger
