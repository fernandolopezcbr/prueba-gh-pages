if ('serviceWorker'in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(reg=> console.log('Register of serviceworker sucessful',reg))
    .catch(err=> console.warn("Error al tratar de registra sw",err))
}