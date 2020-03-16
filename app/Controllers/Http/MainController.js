'use strict'

const { getPagePosts } = use('App/Helpers/scraper')

class MainController {
    async index ({ request, response}) {
        const page = request.params.page || '1'

        let posts = []

        for (let index = 1; index <= page; index++) {
            posts = posts.concat(await getPagePosts(index))
        }

        response.json(posts)
    }
}

module.exports = MainController
