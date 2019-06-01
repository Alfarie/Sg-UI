import moment from 'moment';
export const authUser = () => {
    var expiresIn = localStorage.getItem('expiresIn');
    var tokenId = localStorage.getItem('tokenId');
    var username = localStorage.getItem('username');

    if (!tokenId) {
        console.error('No token');
        return false;
    }

    var loginTime = localStorage.getItem('login');
    var login = moment(loginTime); 
    var now = moment();
    var diff = moment.duration(now.diff(login));
    if(diff.asSeconds() > expiresIn){
        return false;
    }
    console.log('Expire in: ' + (expiresIn - diff.asSeconds()) + 's');
    return true;
}

export const expiresIn = ()=>{
    var loginTime = localStorage.getItem('login');
    var expiresIn = localStorage.getItem('expiresIn');
    var login = moment(loginTime); 
    var now = moment();
    var diff = moment.duration(now.diff(login));
    return expiresIn - diff.asSeconds();
}