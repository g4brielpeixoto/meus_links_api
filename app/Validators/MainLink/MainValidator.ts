import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MainLinkStoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    title: schema.string({ trim: true }),
    url: schema.string({ trim: true }),
    icon: schema.string({ trim: true }),
    active: schema.boolean()
  })
  public messages = {}
}
