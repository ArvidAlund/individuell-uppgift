import PostList from "./postList.js";
import { POST } from "./postClass.js";

export default function GeneratePosts(){

    // Hämta alla Poster
    const Posts = PostList().blogPosts

    // Generera fram Poster
    Posts.forEach((post)=>{
        const article = new POST(post)
        article.CreatePost()
        article.OrderPosts()
    })
}