export const createFetch = (url) =>  (callback, errorCallback)  => {
    fetch(url)
        .then(response => response.json())
        .then(callback)
        .catch(errorCallback)
}

// ??? Правильно ли так?
export const createFetchPost = (url) =>  (body, callback, errorCallback)  => {
    fetch(url, {
        method: 'POST',
        body: body
    })
        .then(response => response.json())
        .then(callback)
        .catch(errorCallback)
}