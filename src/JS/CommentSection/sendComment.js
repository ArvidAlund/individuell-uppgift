export default function SendComment(id, comment){

    // Kolla om kommentaren är tom
    if (comment.trim() === "") return

    // Skapa elementet för kommentaren
    const Comment = document.createElement("p");
    Comment.classList.add("Comment");
    Comment.textContent = comment;

    // Hitta rätt kommentarsfält + lägg till kommentar
    document.querySelectorAll(".CommentsWrapper").forEach((CommentSection) =>{
        if (CommentSection.dataset.id.trim() == id.trim()){
            const CommentsContainer = CommentSection.firstElementChild;
            CommentsContainer.appendChild(Comment)
        }
    })
}