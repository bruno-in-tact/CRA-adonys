import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
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
 * allNotDeleted =  find all usersProject not soft deleted
 * Params: none
 *  GET : userProject/get
 */
    public async getAllNotDeleted({ }: HttpContextContract) {
      const allNotDeleted = await UserProject.findAllNotDeleted()
      return allNotDeleted
    }
  /*
 * new =  create a new userProject
 * Params: request, response
 */
  public async new({ request }: HttpContextContract) {

    const userProjectPayLoad = await request.validate(CreateUserProjectValidator)
    const userProject = await UserProject.create(userProjectPayLoad)

    console.log(userProjectPayLoad)

    return userProject


  }

  /**
    * FIND user by ID
    * Find User /userProject/:id
    */
  public async find({ params, response }: HttpContextContract) {
    const userProject = await UserProject.find(params.id);
    return userProject
  }
  /*
   * update =  update by id
   * Params: request, response
   */
  public async update({ request, params, response, }: HttpContextContract) {
    const userProject = await UserProject.findOrFail(params.id)

    userProject.merge(await request.validate(UpdateUserProjectValidator))
    userProject.save()

    return userProject

  }
  /**
 * Update user to isDeleted=true
 * Update User /userProject/soft-delete/:id
 */

  public async softDelete({ params }: HttpContextContract) {
    const userProject = await UserProject.findOrFail(params.id)
    userProject.isDeleted = true
    await userProject.save()

    return userProject
  }


  /**
 * DELETE userProject 
 * DELETE User /userProject/delete/:id
 */
  public async destroy({ params }: HttpContextContract) {
    const userProject = await UserProject.findOrFail(params.id)
    await userProject.delete()

    return userProject
  }
}
