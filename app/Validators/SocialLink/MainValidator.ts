import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MainLinkStoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    url: schema.string({ trim: true })
  })
  public messages = {}
}
