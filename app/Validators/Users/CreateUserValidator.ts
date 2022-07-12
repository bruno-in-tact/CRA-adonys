import { schema, CustomMessages, rules, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Runner } from '@japa/runner'
import { Request } from '@adonisjs/core/build/standalone'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public reporter = validator.reporters.api;


  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({

    first_name: schema.string({ trim: true }, [rules.alpha(), rules.escape()]),
    last_name: schema.string({ trim: true }, [rules.alpha(),rules.escape()]),

    email: schema.string({ trim: true }, [rules.email(), rules.escape(),
    rules.normalizeEmail({
      allLowercase: true,
      gmailRemoveDots: false,
    }), 
    rules.unique({
      table: 'users', column: 'email', caseInsensitive: true,
      where: { is_deleted: false },
    })]),

    password: schema.string( [rules.minLength(6), rules.escape()],),
    start_date: schema.string([rules.escape()]),
    remember_me_token: schema.string.optional([rules.escape()]),
    town: schema.string.optional({ trim: true }, [rules.alpha(),rules.escape()]),
    country: schema.string.optional({ trim: true }, [rules.alpha(),rules.escape()]),
    is_admin: schema.boolean.optional([rules.escape()]),

  })


  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */


  public messages: CustomMessages = {
    'required': "The field '{{field}}' is required",
    'email': "The field '{{field}}'  and with a correct format",
    'email.unique': "this email adresse is already in use",
    'rule': "the field {{field}} only accept letters",
    'password.minLength': "The field '{{field}}' must have atleast 6 character ",
  };
}