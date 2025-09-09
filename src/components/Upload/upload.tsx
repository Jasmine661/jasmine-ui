import React, { useRef, useState } from 'react'
// import axios from 'axios'
import './_style.scss'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name?: string
  status: UploadFileStatus
  percent: number
  raw: File
  response?: any
  error?: any
}

export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
  name?: string
  data?: { [key: string]: any }
  header?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  children?: React.ReactNode
  drag?: boolean
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name = 'file',
    data,
    header,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid))
    onRemove?.(file)
  }

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (!file) return
    uploadFiles(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          // 返回Promise表示等待异步处理
          result.then((processFile) => {
            post(processFile)
          })
        } else if (result !== false) {
          // 返回除了false以外的值表示上传原文件，返回false是不允许上传
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList((prev) => [_file, ...prev])
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...header,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e) => {
          console.log('onUploadProgress:', e.loaded, e.total)
          if (!e.total) return
          const percentage = Math.round((e.loaded * 100) / e.total)
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            onProgress?.(percentage, file)
          }
        },
      })
      .then((res) => {
        console.log(res)
        updateFileList(_file, { status: 'success', response: res.data })
        onSuccess?.(res.data, file)
        onChange?.(file)
      })
      .catch((err) => {
        console.log(err)
        updateFileList(_file, { status: 'error', error: err })
        onError?.(err, file)
        onChange?.(file)
      })
  }

  console.log(fileList)

  return (
    <div className="jasmine-upload-component">
      <div
        className="jasmine-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {/* <Button btnType="primary" onClick={handleClick}>
          Upload File
        </Button> */}
        {drag ? <Dragger onFile={(files) => uploadFiles(files)}></Dragger> : children}
        <input
          ref={fileInputRef}
          className="jasmine-file-input"
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload
