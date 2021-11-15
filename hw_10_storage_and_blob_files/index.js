import {addSavedImagesToGallery} from './service/mainService.js';
import {formSubmitListener} from './listeners/listeners.js'

// Вытащим все ссылки из localStorage и добавим на страницу
addSavedImagesToGallery();
// Подключим listener на форму
formSubmitListener();