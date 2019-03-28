/**
 * This function is a helper function which returns a HTTP authenticaton
 * header containing the basic authentication credentials of the currently 
 * logged in user from local storage.
 */

export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authdata) {
        return { 'Authorisation': 'Basic ' + user.authdata };
    } else {
        return{};
    }

}