export default function scrollToImg(id) {
    const imgId = `detail_image_${id}`
    var targetDiv = document.getElementById(imgId);
    targetDiv.scrollIntoView({   behavior: 'smooth',
                                    block: 'center',
                                   inline: 'center' });
}
