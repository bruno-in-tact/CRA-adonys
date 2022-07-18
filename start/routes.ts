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

// Route.resource('/users', 'UserController')


Route.group(() => { 

    Route.group(() => {
        Route.post('/new', 'UserController.new') 
        Route.post('/login', 'SecurityController.login')
        // Route.get('/login', 'SecurityController.session')
    }).prefix('/users')
    
    Route.group(()=> {    
        Route.get('/index', 'UserController.index')
        Route.get('/me', 'UserController.me')
        Route.get('/get', 'UserController.getAllNotDeleted')
        Route.get('/:id', 'UserController.find')
        Route.put('/update/:id', 'UserController.update')
        Route.put('/setAdmin/:id', 'UserController.setToAdmin')
        Route.delete('/soft-delete/:id', 'UserController.softDelete')
        Route.delete('/delete/:id', 'UserController.destroy')
        Route.get('/logout', 'SecurityController.logout')
    //  }).prefix('/users').middleware(['auth'])
    }).prefix('/users')



    Route.group(() => {
        Route.post('/new', 'ProjectController.new')
        Route.get('/index', 'ProjectController.index')
        Route.get('/get', 'ProjectController.getAllNotDeleted')
        Route.get('/:id', 'ProjectController.find')
        Route.put('/update/:id', 'ProjectController.update')
        Route.delete('/soft-delete/:id', 'ProjectController.softDelete')
        Route.delete('/delete/:id', 'ProjectController.destroy')
    }).prefix('/projects').middleware(['auth'])


    Route.group(() => {
        Route.post('/new', 'PlanningController.new')
        Route.get('/index', 'PlanningController.index')
        Route.get('/get', 'PlanningController.getAllNotDeleted')
        Route.get('/:id', 'PlanningController.find')
        Route.put('/update/:id', 'PlanningController.update')
        Route.delete('/soft-delete/:id', 'PlanningController.softDelete')
        Route.delete('/delete/:id', 'PlanningController.destroy')

    }).prefix('/plannings').middleware(['auth'])


    Route.group(() => {
        Route.post('/new', 'UserProjectsController.new')
        Route.get('/index', 'UserProjectsController.index')
        Route.get('/get', 'UserProjectsController.getAllNotDeleted')
        Route.get('/:id', 'UserProjectsController.find')
        Route.put('/update/:id', 'UserProjectsController.update')
        Route.delete('/soft-delete/:id', 'UserProjectsController.softDelete')
        Route.delete('/delete/:id', 'UserProjectsController.destroy')

    }).prefix('/usersProjects').middleware(['auth'])

}).prefix('/api')
