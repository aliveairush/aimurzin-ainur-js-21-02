import {imgbbApi} from "../api/imgbbApi.js";
import {addImgToGallery} from "../components/galleryComponent.js";
import {saveImageInStorage} from "../service/mainService.js";
import {loader} from "../components/loader.js";

export const formSubmitListener = () => {
    document.getElementById("formId").addEventListener('submit', (e) => {
        e.preventDefault();
        loader.createLoader(); // Пока идет загрузка отобразить лоадер

        const currentFileImage = new FormData(e.target).get('my-file');
        const formDataToSend = new FormData();

        const reader = new FileReader();
        reader.readAsDataURL(currentFileImage); // Convert file to base64 url
        reader.onload = () => {
            formDataToSend.set('key', '4fb4845de1b6e7733dc1f565a104ecbb') // Идентификатор пользователя на imgbb.com
            formDataToSend.set('image', reader.result.replace(/^.*,/, ''));

            imgbbApi.uploadImage(formDataToSend, response => {
                saveImageInStorage(response.data.display_url);
                addImgToGallery(response.data.display_url);

                loader.remove(); // Прервать лоадер
            });
        }
    })
};