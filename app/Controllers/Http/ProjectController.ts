import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import CreateProjectValidator from 'App/Validators/Projects/CreateProjectValidator'
import UpdateProjectValidator from 'App/Validators/Projects/UpdateProjectValidator'

export default class ProjectController {
  
  /*
   * index = GET ALL
   * Params: no
   */
  public async index({ }: HttpContextContract) {
    const projects = await Project.all()
    return projects

  }

   /*
 * allNotDeleted =  find all users not soft deleted
 * Params: none
 *  GET : users/get
 */
   public async getAllNotDeleted({ }: HttpContextContract) {
    const allNotDeleted = await Project.findAllNotDeleted()
    return allNotDeleted
  }

  /*
 * new =  create a new userx
 * Params: request, response
 */
  public async new({ request }: HttpContextContract) {
    const projectPayLoad = await request.validate(CreateProjectValidator)
    const project = await Project.create(projectPayLoad)
    console.log(projectPayLoad)

    return  project

  }

  // public async new({ request }: HttpContextContract) {
  //   // const userPayLoad = await request.validate(CreateUser)
  //   const body = request.body()
  //   const project = await Project.create(body)
  //   return  project

  // }

  /**
    * FIND project by ID
    * Find project /users/:id
    */
  public async find({ params, response }: HttpContextContract) {
    const project = await Project.find(params.id);
    return project
  }
  /*
   * update =  update by id
   * Params: request, response
   */
  public async update({ request, params, }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)

    project.merge(await request.validate(UpdateProjectValidator))
    project.save()

    return project

  }
  /**
 * Update project to isDeleted=true
 * Update Project /project/soft-delete/:id
 */

  public async softDelete({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)
    project.isDeleted = true
    await project.save()

    return project
  }



  /**
 * DELETE project 
 * DELETE project /project/delete/:id
 */
  public async destroy({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)
    await project.delete()

    return project
  }
}
