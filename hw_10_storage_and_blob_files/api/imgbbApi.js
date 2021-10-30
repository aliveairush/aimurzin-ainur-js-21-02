import { createFetchPost} from "../utils/fetchUtils.js";
import {UPLOAD_IMAGE} from "../constans/imgbb.js";

export const imgbbApi = {
    uploadImage: createFetchPost(UPLOAD_IMAGE)
}