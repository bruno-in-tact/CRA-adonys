import { Exception } from '@adonisjs/core/build/standalone'
import UnAuthorized from 'App/Exceptions/UnAuthorizedException'

const message = 'You are not authorized'
const status = 403
const errorCode = 'E_UNAUTHORIZED'

throw new UnAuthorized(message, status, errorCode)
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnAuthorizedException extends Exception {
    public async handle(error: this, ctx: HttpContextContract) {
        ctx.response.status(error.status).send(error.message)
      }
}