import axios from 'axios';

export const SEARCH_RETURNED = 'SEARCH_RETURNED';
export const SINGLE_PAGE = 'SINGLE_PAGE';

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