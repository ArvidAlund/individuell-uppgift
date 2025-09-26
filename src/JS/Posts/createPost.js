import { POST } from "./postClass.js";

export default function CreatePost() {
    // Wrapper för modal
    const createPostWrapper = document.createElement("section");
    createPostWrapper.classList.add("CreatePostWrapper");
    document.body.appendChild(createPostWrapper);

    // Exit-knapp
    fetch("/public/icons/plus.svg")
        .then(res => res.text())
        .then(svgText => {
            const exitBtn = document.createElement("div");
            exitBtn.innerHTML = svgText
            exitBtn.title = "Stäng";
            exitBtn.classList.add("exitBtn");
            exitBtn.addEventListener("click", () => createPostWrapper.remove());
            createPostWrapper.appendChild(exitBtn);
        })

    // Form-wrapper
    const formWrapper = document.createElement("div");
    formWrapper.classList.add("formWrapper");
    createPostWrapper.appendChild(formWrapper);

    // Animering med GSAP
    gsap.from(formWrapper, {
        scale: 0,
        x: window.innerWidth * 0.7,
        y: -window.innerHeight * 0.7,
        ease: "power2.out",
        duration: 1
    });

    // Formulär
    const form = document.createElement("form");
    formWrapper.appendChild(form);

    // Helper-funktion för input
    const createInput = (labelText, name, type = "text") => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("inputWrapper");

        const label = document.createElement("label");
        label.textContent = labelText;
        label.htmlFor = name;

        const input = document.createElement("input");
        input.type = type;
        input.name = name;
        input.id = name;
        input.required = true;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        return wrapper;
    };

    // Skapa fält
    form.appendChild(createInput("Titel*", "title"));
    
    // Content textarea
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("inputWrapper");

    const contentLabel = document.createElement("label");
    contentLabel.textContent = "Innehåll*";
    contentLabel.htmlFor = "content";

    const contentTextarea = document.createElement("textarea");
    contentTextarea.name = "content";
    contentTextarea.id = "content";
    contentTextarea.required = true;
    contentTextarea.rows = 8;

    contentWrapper.appendChild(contentLabel);
    contentWrapper.appendChild(contentTextarea);
    form.appendChild(contentWrapper);

    // Skapa submit-knapp
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Skapa inlägg";
    form.appendChild(submitBtn);

    // Hantera formulärskick
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const newPost = {
            id: `post-${Date.now()}`,
            title: form.title.value,
            author: "Arvid Ålund",
            date: new Date().toISOString().split("T")[0],
            content: contentTextarea.value
        };

        const article = new POST(newPost)
        article.CreatePost()
        article.OrderPosts()
        // Ta bort modal
        createPostWrapper.remove();
    });
}
