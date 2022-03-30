import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User, Link } from 'App/Models'

export default class PagesController {
  public async show({ params }: HttpContextContract) {
    const user = await User.findByOrFail('username', params.username)

    const links = JSON.parse(user.links) as Array<Link>

    let activeLinks = [{}]

    if (links) activeLinks = links.filter((link) => link.active === true)
    else activeLinks = []

    return {
      name: user.name,
      username: user.username,
      validated: user.validated,
      links: activeLinks,
      avatar: user.avatar,
      avatarUrl: user.avatarUrl
    }
  }
}
