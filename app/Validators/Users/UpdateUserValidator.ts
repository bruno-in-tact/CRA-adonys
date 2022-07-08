import { schema, CustomMessages, rules, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

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

    first_name: schema.string.optional({trim: true }, [ rules.regex(/^[a-zA-Z]+$/),]),
    last_name: schema.string.optional({trim: true }, [rules.regex(/^[a-zA-Z]+$/),]),
    email:schema.string.optional({trim: true }, [rules.email(), rules.unique({table :'users', column :'email'})]),
    password:schema.string.optional({trim: true}, [rules.minLength(6),rules.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)],),
    start_date:schema.string.optional(),
    remember_me_token:schema.string.optional(),
    town:schema.string.optional({trim: true }, [ rules.regex(/^[a-zA-Z]+$/),]),
    country:schema.string.optional({trim: true }, [ rules.regex(/^[a-zA-Z]+$/),]),
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

  public messages = {
    '*': (field,rule, arrayExpressionPointer, options) => {
      return `${field} failed ${rule} validation`
    }
  }

//   public messages: CustomMessages = {
//      minLength: '{{field}} must be at least {{options.minLength}} characters long',
//      maxLength: '{{field}} must be at least {{options.minLength}} characters long',
//     'first_name.required' : 'First name is required and only alphabatical letter are accepted',
//     'last_name.required' : 'Last name is required and only alphabatical letter are accepted',
//     'email.required' : 'Email is required, and must be of format email',
//     'password.required' : 'Passwords should have at least 8 characters and contain a digit (e.g. 0-9), a lowercase character (e.g. a-z) and an uppercase character',

//   }
// }
}