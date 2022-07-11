import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserProject from 'App/Models/UserProject'
import CreateUserProjectValidator from 'App/Validators/UsersProjects/CreateUserProjectValidator'
import UpdateUserProjectValidator from 'App/Validators/UsersProjects/UpdateUserProjectValidator'

export default class UserProjectsController {
  /*
   * index = GET ALL
   * Params: no
   */
  public async index({ }: HttpContextContract) {
    const usersProjects = await UserProject.all()
    return usersProjects

  }

  /*
 * new =  create a new user
 * Params: request, response
 */
  public async new({ request }: HttpContextContract) {
    const userProjectPayLoad = await request.validate(CreateUserProjectValidator)
    const user = await UserProject.create(userProjectPayLoad)
    console.log(userProjectPayLoad)

    return  user

  }

  /**
    * FIND user by ID
    * Find User /users/:id
    */
  public async find({ params, response }: HttpContextContract) {
    const user = await UserProject.find(params.id);
    return user
  }
  /*
   * update =  update by id
   * Params: request, response
   */
  public async update({ request, params, response, }: HttpContextContract) {
    const user = await UserProject.findOrFail(params.id)

    user.merge(await request.validate(UpdateUserProjectValidator))
    user.save()

    return user

  }
  /**
 * Update user to isDeleted=true
 * Update User /users/soft-delete/:id
 */

  public async softDelete({ params }: HttpContextContract) {
    const user = await UserProject.findOrFail(params.id)
    user.isDeleted = true
    await user.save()

    return user
  }

  /**
   * Update user to Admin by id
   * Update Admin /users/setAdmin/:id
   */
  public async setToAdmin({ params }: HttpContextContract) {
    const user = await UserProject.findOrFail(params.id)
    user.isAdmin = true
    await user.save()

    return user
  }

  /**
 * DELETE user 
 * DELETE User /users/delete/:id
 */
  public async destroy({ params }: HttpContextContract) {
    const user = await UserProject.findOrFail(params.id)
    await user.delete()

    return user
  }
}
