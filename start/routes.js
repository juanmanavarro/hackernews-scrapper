'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Axios = use('axios')
const Cherio = use('cheerio')

Route.get('/:page([0-9]+)?', async ({ response, params }) => {
    const page = await Axios.get('https://news.ycombinator.com/')
    const $ = Cherio.load(page.data);

    const data = $('.athing').map((index, element) => {
        element = $(element);

        return {
            id: element.find('.rank').text().slice(0, -1),
            title: element.find('.storylink').text(),
            url: element.find('.storylink').attr('href'),
        }
    })

    response.json(data.toArray());
})
