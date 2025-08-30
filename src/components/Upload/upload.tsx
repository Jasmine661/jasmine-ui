import React, { useRef } from 'react'
import Button from '../Button/Button'
// import axios from 'axios'
import './_style.scss'

interface UploadProps {
  action: string
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
}

export const Upload: React.FC<UploadProps> = (props) => {
  // const { action, onProgress, onSuccess, onError } = props
  const fileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  return (
    <div className="jasmine-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        上传文件
      </Button>
      <input
        className="jasmine-file-input"
        type="file"
        ref={fileInput}
        style={{ display: 'none' }}
      />
    </div>
  )
}
