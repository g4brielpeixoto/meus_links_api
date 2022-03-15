import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AvatarValidator } from 'App/Validators/User'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import fs from 'fs'

export default class UserAvatarController {
  public async show({ params, response }: HttpContextContract) {
    return response.download(Application.tmpPath('uploads', params.file))
  }

  public async update({ request, auth }: HttpContextContract) {
    const response = await Database.transaction(async (trx) => {
      const { file } = await request.validate(AvatarValidator)

      const user = auth.user!.useTransaction(trx)

      user.avatar = `${new Date().getTime()}.${file.extname}`
      await user.save()

      await file.move(Application.tmpPath('uploads'), {
        name: user.avatar,
        overwrite: true
      })

      return user.avatar
    })
    if (response) return auth.user!.avatarUrl
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
