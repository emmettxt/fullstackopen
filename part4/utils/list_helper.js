

const dummy = () => {
    return 1 
}

const totalLikes =(blogs) =>{
    const reducer = (sum,blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer,0)

}
const favoriteBlog =(blogs)=>{
    const mostLikes = 
        blogs.reduce(
            (prev,current) => Math.max(prev,current.likes),
            0)
    console.log('mostlikes: ',mostLikes)
    return blogs.find(blog=>blog.likes === mostLikes)
}
const _ = require('lodash')
const mostBlogs =(blogs) =>{
    return (
        _(blogs)
            .countBy('author')
            .map(
                (count,id)=>({
                    author:id,
                    count: count
                })).maxBy('count')
    )
    // const countByAuthor = _.countBy(blogs,b => b.author)
    // const maxCount = _(countByAuthor).values().max()
    // return _.findKey(countByAuthor, x => x == maxCount)

}

const mostLikes =(blogs) =>{
    return (
        _(blogs)
            .groupBy('author')
            .map(
                (author,id)=>({
                    author:id,
                    likes: _.sumBy(author,'likes')
                }))
            .maxBy('likes')
    )
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}