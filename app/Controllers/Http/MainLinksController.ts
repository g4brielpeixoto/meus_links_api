import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MainValidator } from 'App/Validators/MainLink'
import { MainLink } from 'App/Models'

export default class MainLinksController {
  public async store({ request, auth }: HttpContextContract) {
    const mainLink = await request.validate(MainValidator)
    const user = auth.user!
    await (await user.related('mainLinks').create(mainLink)).save()
  }

  public async show({ auth }: HttpContextContract) {
    const mainLinks = await MainLink.query().where('user_id', auth.user!.id)
    return mainLinks
  }

  public async update({ request, auth, params, response }: HttpContextContract) {
    const data = await request.validate(MainValidator)
    const mainLink = await MainLink.query()
      .where('user_id', auth.user!.id)
      .andWhere('id', params.id)
      .first()

    if (mainLink) {
      mainLink.merge(data)
      mainLink.save()
      return mainLink
    } else response.notFound()
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const mainLink = await MainLink.query()
      .where('user_id', auth.user!.id)
      .andWhere('id', params.id)
      .first()
    if (mainLink) {
      mainLink.delete()
      mainLink.save()
    } else response.notFound()
  }
}
