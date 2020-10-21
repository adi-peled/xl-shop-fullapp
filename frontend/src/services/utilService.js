import Swal from 'sweetalert2'
export default {
    storeToStorage,
    loadFromStorage,
    makeId,
    swal
}


function swal(pos,time,ico,text){
    const Toast = Swal.mixin({
        toast: true,
        position: pos,
        showConfirmButton: false,
        timer: time,
        timerProgressBar: true,
    })
    Toast.fire({
        icon: ico,
        title: text
    })
}

function storeToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value || null));
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function makeId(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}