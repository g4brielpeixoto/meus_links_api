import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MainValidator } from 'App/Validators/SocialLink'
import { SocialLink } from 'App/Models'

export default class MainLinksController {
  public async store({ request, auth }: HttpContextContract) {
    const socialLink = await request.validate(MainValidator)
    const user = auth.user!
    await (await user.related('socialLinks').create(socialLink)).save()
  }

  public async show({ auth }: HttpContextContract) {
    const socialLink = await SocialLink.query().where('user_id', auth.user!.id)
    return socialLink
  }

  public async update({ request, auth, params, response }: HttpContextContract) {
    const data = await request.validate(MainValidator)
    const socialLink = await SocialLink.query()
      .where('user_id', auth.user!.id)
      .andWhere('id', params.id)
      .first()

    if (socialLink) {
      socialLink.merge(data)
      socialLink.save()
      return socialLink
    } else response.notFound()
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const socialLink = await SocialLink.query()
      .where('user_id', auth.user!.id)
      .andWhere('id', params.id)
      .first()
    if (socialLink) {
      socialLink.delete()
      socialLink.save()
    } else response.notFound()
  }
}
