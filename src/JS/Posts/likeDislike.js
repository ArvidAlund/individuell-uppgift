export default function LikeDislike(item){
    //Hämta alla ikoner från samma post
    const otherIcons = document.querySelectorAll(`[data-id="${item.dataset.id}"]`);

    // Ta ut den andra ikonen alt Dislike/Like
    const index = +item.dataset.index === 0 ? 1 : 0

    const otherIcon = Array.from(otherIcons).find(el =>{
        if(+el.dataset.index === index){
            return el
        }
    })

    //Kolla om andra ikonen är aktiv
    if('active' in otherIcon.dataset){
        delete otherIcon.dataset.active;
        otherIcon.style = "";
    }

    // Kolla om item redan är aktiv
    if('active' in item.dataset){
        delete item.dataset.active;
        item.style = "";
    } else{
        //Sätt färg och aktivt läge på den klickade ikonen
        item.dataset.active = true;

        item.style.color = Number(item.dataset.index) === 0
        ? "var(--color-success)"
        : "var(--color-danger)";
    }
}