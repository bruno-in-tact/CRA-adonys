/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }
  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
    //  */
    // if (error.code === 'E_ROW_NOT_FOUND' || error.code === 'E_ROUTE_NOT_FOUND' || error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
    //   const message = 'error 404 not found please verify your input'
    //   return ctx.response.status(404).send(error.messages)
    // }

    // if (error.code === ' ER_NO_REFERENCED_ROW_2' || error.code === 'E_VALIDATION_FAILURE' || error.code ==='Invalid Input') {
    //   const message = 'error 500 '
    //   return ctx.response.status(500).send(error.message)
    // }


    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }

}