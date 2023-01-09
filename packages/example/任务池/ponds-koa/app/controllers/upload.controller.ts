import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import { BadRequestError, Post, JsonController, UploadedFile } from 'routing-controllers'
import { Service } from 'typedi'
import dayjs from 'dayjs'

@JsonController()
@Service()
export class UploadController {
  constructor() {}

  // 声明存放资源的路径
  uploadDir = 'app/public/upload'
  uploadFilePath = ''

  @Post('/upload')
  async saveFile(@UploadedFile('upload') file: any) {
    this.uploadFilePath = ''
    try {
      const day = dayjs(new Date()).format('YYYYMMDD')
      const dir = path.join(this.uploadDir, day)
      const date = Date.now()
      await mkdirp(dir)
      this.uploadFilePath = path.join(dir, date + path.extname(file.originalname))
      fs.writeFileSync(this.uploadFilePath, file.buffer)
    } catch {
      throw new BadRequestError('上传失败')
    } finally {
      console.log('hi')
    }
    return {
      msg: '上传成功',
      data: { path: this.uploadFilePath.replace(/app/g, '') },
    }
  }
}
