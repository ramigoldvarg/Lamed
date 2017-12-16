import axios from 'axios';

export const SEARCH_RETURNED = 'SEARCH_RETURNED';
export const SINGLE_PAGE = 'SINGLE_PAGE';
export const ADDED_NEW_PAGE = 'ADDED_NEW_PAGE';
export const DELETE_PAGE = 'DELETE_PAGE';

export function searchPage(contentToSearch) {
    const request = axios.get("/pages/search/" + contentToSearch);

    return ({
        type: SEARCH_RETURNED,
        payload: request
    });
}

export function getSinglePage(id) {
    const request = axios.get("/pages/" + id);

    return ({
        type: SINGLE_PAGE,
        payload: request
    });
}

export function addPage(data) {
    const request = axios.post("/pages", data);

    return ({
        type: ADDED_NEW_PAGE,
        payload: request
    });
}

export function deletePage(id, callback) {
    const request = axios.delete("/pages/" + id).then(callback);

    return ({
        type: DELETE_PAGE,
        payload: request
    });
}