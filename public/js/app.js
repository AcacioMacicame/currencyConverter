/**
 * declaraction of variables
 * @type {Element}
 */
let currency = document.getElementById("currency");
let from = document.getElementById("from");
let to = document.getElementById("to");
let final = document.getElementById("final");
let convert = document.getElementById("convert");

/**
 * the listener of click
 */
convert.onclick = (event) => {
    let key = `${from.value}_${to.value}`;
    fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${key}&compact=ultra`)
    .then((response) => response.json())
    .then((response) => {
        final.value = response[key] * currency.value;
    });
};

/**
 * fetch of datas from the api
 */
fetch('https://free.currencyconverterapi.com/api/v5/currencies')
.then((response) => response.json())
.then((response) => {
    Object.entries(response.results).forEach(([key, value]) => {
        let fromOption = new Option(`${value.currencyName} (${value.currencySymbol})`, key);
        let toOption = new Option(`${value.currencyName} (${value.currencySymbol})`, key);
        from.add(fromOption);
        to.add(toOption);
    });

/**
 * the indexed idb
 * @type {boolean}
 */
const dbPromise = idb.open('currency-converter-db', 1, (upgradeDb) => {
    const currencyStore = upgradeDb.createObjectStore('currency-conversion');
    
    Object.entries(response.results).forEach(([key, value]) => {
        currencyStore.put(`${value.currencyName} (${value.currencySymbol})`, key);
        final.value = response[key] * currency.value;
    });

  });

});

/**
 * the registration of service worker
 */
if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/sw.js')
             .then((cache) => {
              console.log("Service Worker Registered"); 
            });
  }







