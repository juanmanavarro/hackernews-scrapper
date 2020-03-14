'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Axios = use('axios')
const Cherio = use('cheerio')
const Cache = use('Cache')

Route.get('/:page([0-9]+)?', async ({ response, params }) => {
    const page = params.page || '1';

    const data = await Cache.remember(page, 5, async () => {
        const pageResponse = await Axios.get(`https://news.ycombinator.com/news?p=${page}`)
        const $ = Cherio.load(pageResponse.data);

        return $('.athing').map((index, element) => {
            element = $(element);

            return {
                id: element.find('.rank').text().slice(0, -1),
                title: element.find('.storylink').text(),
                url: element.find('.storylink').attr('href'),
            }
        }).toArray()
    })

    response.json(data);
})
