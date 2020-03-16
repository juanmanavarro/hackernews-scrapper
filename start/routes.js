'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Axios = use('axios')
const Cheerio = use('cheerio')
const Cache = use('Cache')

Route.get('/:page([0-9]+)?', async ({ response, params }) => {
    const page = params.page || '1'

    let posts = []
    for (let index = 1; index <= page; index++) {
        if(! await Cache.has(index)) {
            let pageResponse
            try {
                pageResponse = await Axios.get(`https://news.ycombinator.com/news?p=${index}`)

                await Cache.put(index, transformPageData(pageResponse.data), 5)

                posts = posts.concat(transformPageData(pageResponse.data))
            } catch (error) {
                break;
            }
        } else {
            posts = posts.concat(await Cache.get(index))
        }
    }

    response.json(posts)
})

function transformPageData(pageResponseData) {
    let posts = []

    const $ = Cheerio.load(pageResponseData)

    posts = $('.athing').map((index, post) => {
        return {
            id: $(post).find('.rank').text().slice(0, -1),
            title: $(post).find('.storylink').text(),
            url: $(post).find('.storylink').attr('href'),
        }
    }).toArray()

    return posts;
}
