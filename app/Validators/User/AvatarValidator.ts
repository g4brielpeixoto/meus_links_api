import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AvatarValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    file: schema.file({ size: '10mb', extnames: ['jpg', 'png', 'jpeg'] })
  })
  public messages = {
    'file.extname': 'Sua foto de perfil precisa ser do tipo jpg, jpeg ou png',
    'file.size': 'Sua foto de perfil é muito grande, precisa ter no máximo 10mb'
  }
}
