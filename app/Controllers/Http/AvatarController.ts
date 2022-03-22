import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AvatarValidator } from 'App/Validators/User'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import fs from 'fs'
import { Dropbox, Error, files } from 'dropbox'
import path from 'path'

export default class UserAvatarController {
  public async show({ params, response }: HttpContextContract) {
    return response.download(Application.tmpPath('uploads', params.file))
  }

  public async update({ request, auth }: HttpContextContract) {
    const response = await Database.transaction(async (trx) => {
      // const { file } = await request.validate(AvatarValidator)

      const user = auth.user!.useTransaction(trx)

      // if (user.avatar) fs.unlinkSync(Application.tmpPath('uploads', user.avatar))

      const dropbox = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN })
      fs.readFile(path.join('./', 'teste.txt'), 'utf8', (err, contents) => {
        if (err) {
          console.log('Error: ', err)
        }

        dropbox
          .filesUpload({ path: '/teste.txt', contents })
          .then((response: any) => {
            console.log(response)
          })
          .catch((uploadErr: Error<files.UploadError>) => {
            console.log(uploadErr)
          })
      })

      // user.avatar = `${new Date().getTime()}.${file.extname}`
      // dropbox
      //   .filesUpload({ path: `/${user.avatar}`, contents: file })
      //   .then((response) => console.log(response))
      //   .catch((uploadErr: Error<files.UploadError>) => {
      //     console.log(uploadErr)
      //   })

      // await user.save()

      // await file.move(Application.tmpPath('uploads'), {
      //   name: user.avatar,
      //   overwrite: true
      // })

      return user.avatar
    })
    if (response) return { avatar: response, avatarUrl: auth.user!.avatarUrl }
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
