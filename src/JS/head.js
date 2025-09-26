export default function GenerateHead(){
    const header = document.querySelector("header");
    // skapa h1
    const heading = document.createElement("h1");
    heading.textContent = "BLOGG";

    // skapa knapp
    const button = document.createElement("button");
    button.id = "CreatePost";
    button.title = "Nytt inlägg";

    // skapa ikon
    fetch("/public/icons/plus.svg")
        .then(res => res.text())
        .then(svgText => {
            const icon = document.createElement("div");
            icon.innerHTML = svgText
            icon.title = "Skapa inlägg";

            // lägg in ikonen i knappen
            button.appendChild(icon);
        })

    // lägg in allt i body (eller annan container)
    header.appendChild(heading);
    header.appendChild(button);

}