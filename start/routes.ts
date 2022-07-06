import { typeHttpContextContract } from '@ioc:Adonis/Core/HttpContext';
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import PlanningsController from 'App/Controllers/Http/PlanningsController';
import ProjectsController from 'App/Controllers/Http/ProjectsController';
import UserProjectsController from 'App/Controllers/Http/UserProjectsController';
import UserController from 'App/Controllers/UserController';


Route.get('/', 'HomeController.index');


Route.group(()=> {

    Route.group(() => {
        Route.post('/', UserController)
        Route.get('/:id', UserController)
    }).prefix('/users')


    Route.group(() => {
        Route.post('/', ProjectsController)
        Route.get('/:id', ProjectsController)
    }).prefix('/projects')


    Route.group(() => {
        Route.post('/', PlanningsController)
        Route.get('/:id', PlanningsController)
    }).prefix('/plannings')


    Route.group(() => {
        Route.post('/', UserProjectsController)
        Route.get('/:id', UserProjectsController)
    }).prefix('/users-Projects')

}).prefix('/api')