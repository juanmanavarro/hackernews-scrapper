'use strict'

const Axios = use('axios')
const Cheerio = use('cheerio')
const Cache = use('Cache')

class MainController {
    async index ({ request, response}) {
        const page = request.params.page || '1'

        let posts = []
        for (let index = 1; index <= page; index++) {
            if(! await Cache.has(index)) {
                let pageResponse
                try {
                    pageResponse = await Axios.get(`https://news.ycombinator.com/news?p=${index}`)

                    let pagePosts = transformPageData(pageResponse.data)

                    await Cache.put(index, pagePosts, 1)

                    posts = posts.concat(pagePosts)
                } catch (error) {
                    break;
                }
            } else {
                posts = posts.concat(await Cache.get(index))
            }
        }

        response.json(posts)
    }
}

// here for simplicity
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

    console.log('transform', posts.length);

    return posts;
}

module.exports = MainController
