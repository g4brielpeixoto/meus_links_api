import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AvatarValidator } from 'App/Validators/User'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import fs from 'fs'
import { Dropbox, Error, files } from 'dropbox'

export default class UserAvatarController {
  public async show({ params, response }: HttpContextContract) {
    return response.download(Application.tmpPath('uploads', params.file))
  }

  public async update({ request, auth }: HttpContextContract) {
    const transactionResponse = await Database.transaction(async (trx) => {
      const { file } = await request.validate(AvatarValidator)

      const user = auth.user!.useTransaction(trx)

      // if (user.avatar) fs.unlinkSync(Application.tmpPath('uploads', user.avatar))

      const dropbox = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN })

      user.avatar = `${new Date().getTime()}.${file.extname}`

      let dropboxResponse = {} as Object

      await dropbox
        .filesUpload({ path: `/${user.avatar}`, contents: file })
        .then((response) => (dropboxResponse = response))
        .catch((uploadErr: Error<files.UploadError>) => (dropboxResponse = uploadErr))

      await user.save()

      await file.move(Application.tmpPath('uploads'), {
        name: user.avatar,
        overwrite: true
      })

      return { dropboxResponse, avatar: user.avatar }
    })

    return transactionResponse
  }

  public async destroy({ auth }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const user = auth.user!.useTransaction(trx)

      fs.unlinkSync(Application.tmpPath('uploads', user.avatar))
      user.avatar = ''
      await user.save()
    })
  }
}
