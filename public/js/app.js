// Personal API Key for OpenWeatherMap API
const apiKey = 'afd110d4456e3341d5fab5a4eba895b5&units=imperial';
/* Global Variables */
baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const code = document.getElementById('countryCode');
const zip = document.getElementById('zip');
const generate = document.getElementById('generate')
const feelings = document.getElementById('feelings')
const tempDegree = document.getElementById('temp')

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();


generate.addEventListener('click', () => {
    const url = `${baseURL + zip.value},${code.value}&appid=${apiKey}`
    // check zip code must be not empty
    if (zip.value == '') {
        alert('A valid number zip code is required')
    } else {

        weatherData(url)

    }
});

// fetch weather data from OpenWeatherMap
const weatherData = async (url) => {
    const res = await fetch(url)
    try {
        // convert json to JavaScript object
        const data = await res.json()
        // if no weather data found
        if (data.message) {
            alert(`
    Error ${data.cod}: ${data.message}\ntry another search and make sure you use valid zip code`)
            return

        } else {
            // post data to server then retrieve it to show in site
            postData('/addweather', data).then(() => {
                getData('/all')
            });
        }

    } catch (e) {
        console.log('Error: ' + e)

    }

}

// Post Data to server
const postData = async (route, data) => {
    const res = await fetch(route, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // convert data to JSON
        body: JSON.stringify({
            date: newDate,
            city: data.name,
            temperature: data.main.temp,
            feelings: feelings.value
        })
    });


};

// get data from server
const getData = async (route) => {
    const res = await fetch(route)
    try {
        // convert json to JavaScript object
        const showData = await res.json()
        console.log(showData)
        // Write updated data to DOM elements
        document.querySelector('#date').innerHTML = showData.date;
        document.querySelector('#city').innerHTML = showData.city;
        tempDegree.innerHTML = Math.round(showData.temperature) + '°F';
        document.querySelector('#content').innerHTML = showData.feelings;

        // change background image
        changeBackground(showData.temperature);

        // add smooth scrolling to improve UX in small devices
        document.querySelector('#date').scrollIntoView({
            behavior: "smooth"
        })
    } catch (e) {
        console.log('Error: ' + e)
    }
}
// change background image based on weather temperture degree
const changeBackground = degree => {
    let background = ''
    if (degree <= 50) {
        background = 'snow'
    } else if (degree <= 75) {
        background = 'spring'
    } else if (degree <= 95) {
        background = 'summer'
    } else {
        background = 'hot'
    }
    document.body.setAttribute('style', `background: url("./img/${background}.jpg") no-repeat top center fixed; background-size: cover`)

};