import auth0 from 'auth0-js';
import history from './history';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'uchennaibekwe.auth0.com',
        clientID: 'UufsetP1RUt4Ofl0RgqY9bCY6Xgec7tw',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    userProfile = {};
    // handles the login for auth0
    login = () => {
        this.auth0.authorize();
    } 

    // extract the result from auth0 response
    handleAuth = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult) { // there is a result
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.id_token);

                // extend the expiry time of the token
                const expiresAt = JSON.stringify(authResult.expiresIn * 100 + new Date().getTime());
                localStorage.setItem('expiresAt', expiresAt);

                // fetch logged user profile
                // and store it in the empty 'userProfile' obj
                // This obj would be used in the redux reducer
                this.getProfile();
                // call the './AuthCheck' component afterwards
                // to store the state
                setTimeout(() => { history.replace('/authcheck') }, 2000);
            } else { // fro errors
                console.log(err);
            }
        })
    }

    // return accessToken sent from authentication if available
    getAccessToken = () => {
        if(localStorage.getItem('access_token')) { // check for availability
            const accessToken = localStorage.getItem('access_token');
            return accessToken;
        } else {
            return null
        }
    }

    getProfile = () => {
        let accessToken = this.getAccessToken();
        if(accessToken) {
            // use auth0 client method to extract the profile date 
            // using the accessToken
            this.auth0.client.userInfo(accessToken, (err, profile) => {
                if(profile) {
                    this.userProfile = { profile }
                }
            })
        }
    }

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expiresAt');

        setTimeout(() => { history.replace('/authcheck') }, 2000);
    }

    isAuthenticated = () => {
        const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
        return new Date().getTime() < expiresAt; // whether the token has expired
    }
    
}
