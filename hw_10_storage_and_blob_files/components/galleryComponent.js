export const addImgToGallery = (url) => {
    const img = document.createElement('img');
    img.src = url;
    document.querySelector('.gallery').append(img);
}