import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AvatarValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    base64: schema.string()
  })
  public messages = {}
}
