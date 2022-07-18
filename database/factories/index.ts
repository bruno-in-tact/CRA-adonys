import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'


export const UserFactory = Factory.define(User, ({ faker }) => {
    return {
        first_name: faker.name.findName(),
      last_name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      start_date: "2021-10-08",
      town: faker.random.word(),
      country: faker.random.word(),
      // is_admin: 0

        // "first_name" : "bruno",
        // "last_name" : "DURRANT",
        // "email" : "salutdzz@fef.com",
        // "password" : "LoginUSER-12",
        // "start_date" :"2021-04-12",
        // "town" : "Paris",
        // "country" : "France"
    }

}).build()

