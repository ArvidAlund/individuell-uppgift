import LikeDislike from "./likeDislike.js"
import OpenCommentSection from "../CommentSection/OpenCommentSection.js"


export class POST{
    constructor({author, content, date, id, title}){
        this.author = author
        this.content = content
        this.date = date
        this.id = id
        
        this.title = title
    }

    CreatePost(){
        const article = document.createElement("article");
        article.classList.add("mainpage-article");
        article.dataset.id = this.id

        // Titel
        const title = document.createElement("h4");
        title.textContent = this.title;
        article.appendChild(title);

        // Författare + datum
        const meta = document.createElement("p");
        meta.classList.add("article-meta");
        meta.textContent = `${this.author} • ${this.date}`;
        article.appendChild(meta);

        // Innehåll / preview
        const preview = document.createElement("p");
        preview.classList.add("preview");
        preview.textContent = this.content;
        article.appendChild(preview);

        // Bottom Icons wrapper

        const bottomWrapper = document.createElement("div")
        bottomWrapper.classList.add("bottomWrapper")

        article.appendChild(bottomWrapper)

        // Like/Disslike + Comments

        const iconWrapper = document.createElement("div")
        iconWrapper.classList.add("iconWrapper")

        // Array med sökvägar till de ikoner vi vill använda: gilla, ogilla och kommentarer
        const iconArray = ["/public/icons/thumbs_up.svg", "/public/icons/thumbs_down.svg", "/public/icons/chat.svg"]

        // Loopa igenom varje ikon
        for (let i = 0; i < iconArray.length; i++) {
            const iconPath = iconArray[i];

            // Hämta SVG-filen via fetch
            fetch(iconPath)
                .then(res => res.text())
                .then(svgText => {
                    // Skapa en div för varje ikon
                    const iconDiv = document.createElement("div");
                    iconDiv.classList.add("icon");
                    iconDiv.dataset.id = this.id
                    if(i == 2){
                        iconDiv.dataset.open = false
                    }
                    iconDiv.dataset.index = i
                    iconDiv.innerHTML = svgText;

                    
                    iconDiv.querySelector("path").setAttribute("fill", "currentColor");

                    iconWrapper.appendChild(iconDiv);
                    
                    // Lyssna efter klick på like/dislike/kommentarer
                    iconDiv.addEventListener("click", () => {
                        // Om det är gilla eller ogilla
                        if (i < 2) LikeDislike(iconDiv);

                        if (i == 2) {
                            // Växla öppet/stängt state
                            iconDiv.dataset.open = iconDiv.dataset.open === "true" ? "false" : "true";

                            // öppna eller stäng kommentarsfält
                            if (iconDiv.dataset.open == "true"){
                                iconDiv.style.background = "var(--color-bg-alt)"
                                OpenCommentSection(this.id, true)
                            } else{
                                iconDiv.style.background = ""
                                OpenCommentSection(this.id, false)
                            }
                        }
                    });
                });
        }

        bottomWrapper.appendChild(iconWrapper);

        // Trash Can ikon

        fetch("/public/icons/trash_can.svg")
        .then(res => res.text())
        .then(svgText => {
            // Skapa en div för soptunnan
            const trashCan = document.createElement("div")
            trashCan.classList.add("icon", "trashCan");
            trashCan.dataset.id = this.id
            trashCan.innerHTML = svgText
            trashCan.title = "Radera inlägg"

            bottomWrapper.appendChild(trashCan);

            // Eventlyssnare för att ta bort en bloggpost
            trashCan.addEventListener("click", ()=>{article.remove()})
        })

        // Lägg till i main
        document.querySelector("main").appendChild(article);
    }
    OrderPosts(order = "desc") {
    // Hämta alla bloggposter
    const main = document.querySelector("main");
    const articles = Array.from(main.querySelectorAll("article.mainpage-article"));

    articles.sort((a, b) => {
        // Plocka ut datum från meta text (författare • datum)
        const dateA = new Date(a.querySelector(".article-meta").textContent.split("•")[1].trim());
        const dateB = new Date(b.querySelector(".article-meta").textContent.split("•")[1].trim());

        return order === "asc" ? dateA - dateB : dateB - dateA;
    });

    // Lägg tillbaka i main i rätt ordning
    articles.forEach(article => main.appendChild(article));
}
}