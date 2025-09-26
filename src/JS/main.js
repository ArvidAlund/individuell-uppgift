import GeneratePosts from "./Posts/GeneratePosts.js";
import CreatePost from "./Posts/CreatePost.js";
import GenerateHead from "./Head.js";

// Skapa content
GenerateHead();
GeneratePosts();

// Animationer + eventlyssnare för att skapa nytt blogginlägg
document.addEventListener("DOMContentLoaded", ()=>{
    gsap.from(document.getElementsByTagName("header"), {y:-500, opacity:0, ease: "power3.out", duration:1.5})
    gsap.from(document.getElementsByTagName("main"), {x:-1000, opacity:0, ease: "power2.out", duration:1.5})
    document.getElementById("CreatePost").addEventListener("click", CreatePost)
})