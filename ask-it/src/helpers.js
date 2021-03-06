import moment from 'moment';

export const isObjectExists = (obj) => {
    if(!obj)
        return;
    if(Object.getOwnPropertyNames(obj).length){
        return true;
    }
    else {
        return false;
    }
}

export const isValidEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const humanizeDate = (date) => {
  if (!date) return;
  const _date = new Date(date);
  return moment(_date).format('MMMM DD, YYYY HH:mm');
}