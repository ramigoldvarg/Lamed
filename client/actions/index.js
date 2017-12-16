import axios from 'axios';

export const SEARCH_RETURNED = 'SEARCH_RETURNED';
export const SINGLE_PAGE = 'SINGLE_PAGE';
<<<<<<< HEAD
export const ADDED_NEW_PAGE = 'ADDED_NEW_PAGE';
=======
export const DELETE_PAGE = 'DELETE_PAGE';
>>>>>>> b43dbc05591ad13e0d13eb455d2bf1d3fa6d8a4f

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

<<<<<<< HEAD
export function addPage(data) {
    const request = axios.post("/pages", data);

    return ({
        type: ADDED_NEW_PAGE,
=======
export function deletePage(id, callback) {
    const request = axios.delete("/pages/" + id).then(callback);

    return ({
        type: DELETE_PAGE,
>>>>>>> b43dbc05591ad13e0d13eb455d2bf1d3fa6d8a4f
        payload: request
    });
}