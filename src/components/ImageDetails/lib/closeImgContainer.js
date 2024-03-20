export default function closeImgContainer(id) {
    const imgDetailsContainer = document.getElementById(id);
    if(imgDetailsContainer){
        imgDetailsContainer.classList.add('display-none')
    }
}