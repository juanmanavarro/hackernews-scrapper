'use strict'

const { responseData } = use('App/Helpers/response')

class MainController {
    async index ({ request, response}) {
        const page = request.params.page || '1'
        const posts = []

        response.json(await responseData(page, posts))
    }
}

module.exports = MainController
