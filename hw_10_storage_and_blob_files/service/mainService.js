import {addImgToGallery} from "../components/galleryComponent.js";

export const addSavedImagesToGallery = () => {
    const imgArray = localStorage.getItem('imgArray')? JSON.parse(localStorage.getItem('imgArray')) : [];
    imgArray.forEach(addImgToGallery)
}

export const saveImageInStorage = (url) => {
    const imgArray = localStorage.getItem('imgArray')? JSON.parse(localStorage.getItem('imgArray')) : [];
    imgArray.push(url);
    localStorage.setItem('imgArray', JSON.stringify(imgArray));
}