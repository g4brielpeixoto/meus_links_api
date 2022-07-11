import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password, username } = await request.validate(StoreValidator)

    const token = email
      ? await auth.attempt(email, password, { expiresIn: '30 days' })
      : await auth.attempt(username!, password, { expiresIn: '30 days' })

    return token
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
