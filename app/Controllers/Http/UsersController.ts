import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User, UserKey } from 'App/Models'
import { StoreValidator, UpdateValidator } from 'App/Validators/User'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const user = await Database.transaction(async (trx) => {
      const { email, password, username, redirectUrl } = await request.validate(StoreValidator)
      const user = new User()
      user.useTransaction(trx)
      user.merge({ email, password, username, validated: false })
      await user.save()
      const key = faker.datatype.uuid() + user.id
      await user.related('keys').create({ key })
      const link = `${redirectUrl}/${key}`
      await Mail.send((message) => {
        message.to(email)
        message.from(`${process.env.SMTP_USERNAME}`, 'Meus Links')
        message.subject('Criação de Conta')
        message.htmlView('emails/register', { link })
      })
      return user
    })
    return user
  }

  public async confirm({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    await userKey.load('user')
    userKey.user.validated = true
    userKey.user.save()
    userKey.delete()
  }

  public async update({ request, auth }: HttpContextContract) {
    const user = auth.user!
    const { name, username, bio, links } = await request.validate(UpdateValidator)
    let linksJSON = JSON.stringify(links)
    user.merge({ name, username, bio, links: linksJSON })
    user.save()
    return user
  }

  public async show({ auth }: HttpContextContract) {
    const user = auth.user!
    return user
  }
}
