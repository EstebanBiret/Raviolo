const api_url = 'https://api.weatherapi.com/v1/forecast.json?key=36f1cdeff03d4b70bb6171938230903&days=3&continent_code'
const form = document.querySelector('form')
const locationInput = document.querySelector('[data-location]')
const temperature = document.querySelector('[data-temperature]')
const temperatureText = document.querySelector('[data-temperature-text]')
const date = document.querySelector('[data-date]')
const img = document.querySelector('[data-image]')

/*var audio = new Audio('sound.mp3');
audio.play();*/
/*const current_rotation = 0;

document.querySelector(".backrooms").addEventListener('click', function(){
    current_rotation += 90;
document.querySelector(".backrooms").getElementsByClassName.transform = 'rotate(' + current_rotation + 'deg)';
});*/

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    getTheWeather()
})

const getTheWeather = async () => {
    const days = []
    const otherDays = []

    const location = locationInput.value

    await fetch(api_url + "&q=${" + location + "}")
    .then(response => response.json())
    .then(({forecast, location}) => {
        forecast.forecastday.map(item => {
            days.push({
                icon: item.day.condition.icon,
                text: item.day.condition.text,
                temp: Math.round(item.day.avgtemp_c),
                country: location.country,
                time: location.localtime.split(' ')[1],
                continent: location.tz_id.split('/')[0],
                day: new Date(item.date).toLocaleDateString('fr-FR', {weekday: 'long'})        
            })
        })
    })

    const firstDate = days[0]
    degree = "&#730c"
    temperature.innerHTML = firstDate.temp + degree
    temperatureText.innerHTML = firstDate.text
    date.innerHTML = firstDate.country + ' - ' + firstDate.day + ', ' + firstDate.time
    img.src = 'https://' + firstDate.icon

    days.map((item, i) => {
        if(i > 0){
            otherDays.push(`<div class='day-item'> 
                <div>${item.day}</div> 
                <img src='https://${item.icon}' width='60'> 
            <div data-temperature> 
                <span>${item.temp}</span><sup>°c</sup> 
            </div> 
            <div data-temperature-text>${item.text}</div> 
            </div>`)
        }
    })

    document.querySelector('.app-card-bottom').innerHTML = otherDays.join('')
    //document.querySelector('.app-card-bottom').innerHTML = firstDate.text
    continent = firstDate.continent//.split('/')[0]
    console.log(continent)

    /*Africa	
    America	
    Antarctica	
    Asia	
    Atlantic	
    Australia	
    Europe	
    Indian	
    Pacific*/

   /*document.querySelector('.app-card-top').innerHTML = `<form action="">
                                                            <input type='text' data-location='' autocomplete='off' value='${location}'>
                                                        </form>
                                                        <div data-date="">France - jeudi, 21:46</div>
                                                        <div data-temperature="">13˚c</div>
                                                        <img src="https:////cdn.weatherapi.com/weather/64x64/day/302.png" width="100" data-image="">
                                                        <div data-temperature-text="">Moderate rain</div>`*/

    //element.style.color="green"

    //console.log(element)

}

getTheWeather()
