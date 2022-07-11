import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/ForgotPassword'
import { User, UserKey } from 'App/Models'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ForgotPasswordsController {
  public async store({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { email, username, redirectUrl } = await request.validate(StoreValidator)
      const user = email
        ? await User.findByOrFail('email', email)
        : await User.findByOrFail('username', username)

      if (!user) response.notFound()
      else {
        user.useTransaction(trx)
        const key = faker.datatype.uuid() + user.id
        await user.related('keys').create({ key })
        const link = `${redirectUrl}/${key}`
        await Mail.send((message) => {
          message.to(user.email)
          message.from(`${process.env.SMTP_USERNAME}`, 'Meus Links')
          message.subject('Recuperação de senha')
          message.htmlView('emails/forgotPassword', { link, name: user.firstName() })
        })
      }
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    await userKey.load('user')
    return { userKey: userKey.key, firstName: userKey.user.firstName() }
  }

  public async update({ request, response }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()
    user.merge({ password })
    user.save()
    userKey.delete()
    return response.ok({ message: 'Ok' })
  }
}
