import React, { useMemo, useCallback } from 'react'
import type { UploadFile } from './upload'
import Icon from '../Icons/icon'
import Progress from '../Progress/progress'

export interface UploadListProps {
  fileList: UploadFile[]
  onRemove: (file: UploadFile) => void
}

export const UploadList: React.FC<UploadListProps> = React.memo((props) => {
  const { fileList, onRemove } = props
  
  // 使用 useCallback 缓存删除处理函数
  const handleRemove = useCallback((item: UploadFile) => {
    onRemove(item)
  }, [onRemove])
  
  // 使用 useMemo 缓存列表渲染
  const fileItems = useMemo(() => {
    return fileList.map((item) => {
      return (
        <li className="jasmine-upload-list-item" key={item.uid}>
          <span className={`file-name file-name-${item.status}`}>
            <Icon icon={'file-alt'} theme="secondary" />
            {item.name}
          </span>
          <span className="file-status">
            {(item.status === 'uploading' || item.status === 'ready') && (
              <Icon icon="spinner" spin theme="primary" />
            )}
            {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
            {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
          </span>
          <span className="file-actions">
            <Icon
              icon="times"
              onClick={() => handleRemove(item)}
            />
          </span>
          {item.status === 'uploading' && <Progress percent={item.percent || 0} />}
        </li>
      )
    })
  }, [fileList, handleRemove])
  
  return (
    <ul className="jasmine-upload-list">
      {fileItems}
    </ul>
  )
})

UploadList.displayName = 'UploadList'

export default UploadList
