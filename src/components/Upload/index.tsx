import type { FC } from 'react'
import Upload from './upload'
import UploadList from './uploadList'
import Dragger from './dragger'
import type { UploadProps } from './upload'
import type { UploadListProps } from './uploadList'
import type { DraggerProps } from './dragger'

export type IUploadComponent = FC<UploadProps> & {
  List: FC<UploadListProps>
  Dragger: FC<DraggerProps>
}

const TransUpload = Upload as IUploadComponent
TransUpload.List = UploadList
TransUpload.Dragger = Dragger

export default TransUpload
