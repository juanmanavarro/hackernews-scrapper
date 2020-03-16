'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/:page([0-9]+)?', 'MainController.index')

// Route.get('/test/:page([0-9]+)?', async ({ response, params }) => {
//     const page = params.page || '1'

//     let posts = []
//     for (let index = 1; index <= page; index++) {
//         if(! await Cache.has(index)) {
//             let pageResponse
//             try {
//                 pageResponse = await Axios.get(`https://news.ycombinator.com/news?p=${index}`)

//                 pagePosts = transformPageData(pageResponse.data)

//                 await Cache.put(index, pagePosts, 5)

//                 posts = posts.concat(pagePosts)
//             } catch (error) {
//                 break;
//             }
//         } else {
//             posts = posts.concat(await Cache.get(index))
//         }
//     }

//     response.json(posts)
// })
