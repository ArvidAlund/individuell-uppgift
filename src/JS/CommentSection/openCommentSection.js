import SendComment from "./sendComment.js";

export default function OpenCommentSection(id, open){

    //Kollar om kommentarsfält är öppen eller stängd
    if (!open){
        // Stäng kommentarsfält
        for (const CommentSection of document.querySelectorAll('.CommentsWrapper')) {
            if (id.trim() === CommentSection.dataset.id.trim()) {
                CommentSection.remove();
                break;
            }
        }
    } else{
        // Wrapper för kommentarsfältet
        const CommentsWrapper = document.createElement("div");
        CommentsWrapper.classList.add("CommentsWrapper");
        CommentsWrapper.dataset.id = id;

        // Container för kommentarer
        const CommentsContainer = document.createElement("div");
        CommentsContainer.classList.add("CommentsContainer");

        CommentsWrapper.appendChild(CommentsContainer);

        // Container för input
        const InputContainer = document.createElement("div");
        InputContainer.classList.add("InputContainer");

        CommentsWrapper.appendChild(InputContainer)

        // input för att kommentera
        const CommentInput = document.createElement("input");
        CommentInput.type = "text";
        CommentInput.id = "input";
        CommentInput.classList.add("CommentInput");

        InputContainer.appendChild(CommentInput)

        // Lyssna efter "Enter" knapp + skicka kommentar
        CommentInput.addEventListener("keydown", (e) =>{
            if (e.key === "Enter"){
                SendComment(id, CommentInput.value)
                CommentInput.value = "";
            }
        })

        // Ikon för inputfält

        fetch("/public/icons/send.svg")
            .then(res => res.text())
            .then(svgText => {
                const send = document.createElement("div")
                send.classList.add("icon", "Send");
                send.innerHTML = svgText
                send.title = "Skicka"

                InputContainer.appendChild(send);

                // Lyssna efter klick + skicka kommentar
                send.addEventListener("click", ()=>{
                    SendComment(id, CommentInput.value)
                    CommentInput.value = "";
                })
            })

        
        // Genera ut på rätt Bloggpost
        document.querySelectorAll('article').forEach((article) =>{
            if (id == article.dataset.id){
                article.appendChild(CommentsWrapper)
            }
        })
    }
}