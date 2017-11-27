export const INCREASED_COUNTER = 'INCREASED_COUNTER';

export function increaseCounter() {
    return ({
        type: INCREASED_COUNTER,
        payload: ''
    });
}