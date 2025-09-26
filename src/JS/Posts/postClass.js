import LikeDislike from "./likeDislike.js"
import OpenCommentSection from "../CommentSection/openCommentSection.js"


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
        const rootpath = "/public/icons/"
        const iconArray = ["thumbs_up.svg", "thumbs_down.svg", "chat.svg"]

        // Loopa igenom varje ikon
        Promise.all(iconArray.map((icon, i) =>
            fetch(rootpath + icon)
                .then(res => res.text())
                .then(svgText => ({ svgText, index: i }))
        )).then(results => {
            results.sort((a, b) => a.index - b.index);
            results.forEach(({ svgText, index }) => {
                const iconDiv = document.createElement("div");
                iconDiv.classList.add("icon");
                iconDiv.dataset.id = this.id;
                if(index == 2){
                        iconDiv.dataset.open = false
                    }
                iconDiv.dataset.index = index;
                iconDiv.innerHTML = svgText;

                iconDiv.querySelectorAll("path").forEach(path => {
                    if (!path.getAttribute("d")?.includes("M0 0h48v48H0z")) {
                        path.setAttribute("fill", "currentColor");
                    }
                });

                iconWrapper.appendChild(iconDiv);

                iconDiv.addEventListener("click", () => {
                        // Om det är gilla eller ogilla
                        if (index < 2) LikeDislike(iconDiv);

                        if (index == 2) {
                            // Växla öppet/stängt state
                            iconDiv.dataset.open = iconDiv.dataset.open === "true" ? "false" : "true";

                            // öppna eller stäng kommentarsfält
                            if (iconDiv.dataset.open == "true"){
                                OpenCommentSection(this.id, true)
                            } else{
                                OpenCommentSection(this.id, false)
                            }
                        }});
            });
        });

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