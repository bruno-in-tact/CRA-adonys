import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/Users/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator'

export default class UserController {


    /*
* ME =  return auth user
* Params: none
* GET : users/me
*/
  public async me({ auth, response }) {
    return response.ok({ user: auth.user })
  }


  /*
* userNotDeleted =  find all users even deleted
* Params: none
*  GET : users/index
*/
  public async index({ }: HttpContextContract) {
    const users = await User.all()
    return users
  }

  /*
 * allNotDeleted =  find all users not soft deleted
 * Params: none
 *  GET : users/get
 */
  public async getAllNotDeleted({auth}: HttpContextContract) {
    const allNotDeleted = await User.findAllNotDeleted()
    await auth.use('api').authenticate()
    return allNotDeleted
  }

  /*
 * new =  create a new user
 * Params: request, response
 */
  public async new({ request,response  }: HttpContextContract) {
    const userPayLoad = await request.validate(CreateUserValidator)
    console.log(userPayLoad)
    const user = await User.create(userPayLoad)
    return response.created({user})
  }

  // public async new({ request, params }: HttpContextContract) {
  //     await this.handleRequest(params,request)
  //   return request.body()

  // }

  /**
    * FIND user by ID
    * Find User /users/:id
    */

  public async find({ params, auth }: HttpContextContract) {
    const user = await User.findNotDeleted(params.id);

    return user
  }
  /*
   * update =  update by id
   * Params: request, response
   */
  // public async update({ request, params, response, }: HttpContextContract) {
  //   const user = await User.findOrFail(params.id)

  //   user.merge(await request.validate(UpdateUserValidator))
  //   user.save()

  //   return user

  // }

  public async update({ request, params, auth }: HttpContextContract) {

    const sessionUser = auth.use('web').user!;
    await this.handleRequest(params,request)
    return request.body()
    
  }

  // public async update({ request, response, auth }: HttpContextContract) {
    
  //   const updatePlayLoad = await request.validate(UpdateUserValidator)
   
  //   const user = await auth.user!.merge(updatePlayLoad.user).save()
    
  //   return response.ok({ user })
    
  // }
  /**
 * Update user to isDeleted=true
 * Update User /users/soft-delete/:id
 */ 

  public async softDelete({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    user.isDeleted = true
    await user.save()

    return user
  }

  /**
   * Update user to Admin by id
   * Update Admin /users/setAdmin/:id
   */
  public async setToAdmin({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    user.isAdmin = true
    await user.save()

    return user
  }

  /**
 * DELETE user 
 * DELETE User /users/delete/:id
 */
  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return user
  }

  private async handleRequest (params: HttpContextContract ['params'], request: HttpContextContract['request']){
    const user = params.id ? await User.findOrFail(params.id) : new User();
    const data =  await request.validate(UpdateUserValidator)
    user
        .merge({...data, })
        .save()
  }
}


