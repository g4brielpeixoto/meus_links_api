import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'

export default class PagesController {
  public async show({ params, response }: HttpContextContract) {
    const user = await User.query()
      .where({ username: params.username })
      .preload('mainLinks', (query) => {
        query.where('active', true)
      })
      .preload('socialLinks')
      .first()

    if (!user || !user.validated) return response.notFound()
    return user.serialize({
      fields: {
        omit: ['email', 'createdAt', 'updatedAt', 'rememberMeToken', 'validated']
      }
    })
  }
}
