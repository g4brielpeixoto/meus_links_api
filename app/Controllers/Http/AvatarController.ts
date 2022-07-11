import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AvatarValidator } from 'App/Validators/User'
import Application from '@ioc:Adonis/Core/Application'

export default class UserAvatarController {
  public async show({ params, response }: HttpContextContract) {
    return response.download(Application.tmpPath('uploads', params.file))
  }

  public async update({ request, auth }: HttpContextContract) {
    const { base64 } = await request.validate(AvatarValidator)
    const user = auth.user!
    user.avatar = base64
    await user.save()
  }

  public async destroy({ auth }: HttpContextContract) {
    const user = auth.user!
    user.avatar = ''
    await user.save()
  }
}
