// Utilize Slack and Hubot
// Have at least 15 phrases you can ask or request from your bot and 2 different categories for your bot. i.e: sports related questions, weather related questions
// Be deployed on Heroku

const axios = require ("axios")

module.exports = function (bot) {
    bot.hear(/Good Morning!/, function(res){
        return res.send('Good morning! What can I help you with today?')
    })

    bot.hear(/What day is it today?/i, function(res){
        return res.send(new Date().toDateString())
    })

    bot.respond(/What do you want to do today?/i, function(res){
        return res.send("I'm too fat to do anything!")
    })

//Questions about yelp
    bot.respond(/What's the temp in (.*)/i, async function(msg){
        let cityName
        cityName = msg.match[1]
        console.log(cityName)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19c4a780bd0f2058ff8b95dd621da84e&units=imperial`

        let response = await axios.get(url)    
    }) 

//Questions about weather
    bot.respond(/What's the temp in (.*)/i, async function(msg){
        let cityName
        cityName = msg.match[1]
        console.log(cityName)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19c4a780bd0f2058ff8b95dd621da84e&units=imperial`

        let response = await axios.get(url)
        if (response.data.main.temp < 50){
            return msg.send(`It's currently ` + response.data.main.temp + ' fahrenheit in ' + cityName + '. You should probably wear a jacket!')    
        } else if (response.data.main.temp > 70){
            return msg.send(`It's currently ` + response.data.main.temp + ' fahrenheit in ' + cityName + '. Dress lightly. Its going to be hot!')
        } else { 
            return msg.send(`It's currently ` + response.data.main.temp + ' fahrenheit in ' + cityName)
        }       
    }) 

    bot.respond(/What's the weather like in (.*)/i, async function(msg){
        let cityName
        cityName = msg.match[1]
        console.log(cityName)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19c4a780bd0f2058ff8b95dd621da84e&units=imperial`

        let response = await axios.get(url)
        return msg.send(response.data.weather[0].description)
    })

        bot.respond(/when is sunrise in (.*)/i, async function(msg){
        let cityName
        cityName = msg.match[1]
        console.log(cityName)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19c4a780bd0f2058ff8b95dd621da84e&units=imperial`

        let response = await axios.get(url)
        let seconds = response.data.sys.sunrise
        let date = new Date(seconds * 1000)
        let timeString = date.toLocaleTimeString()
        return msg.send('Sunrise in ' + cityName + ' is at ' + timeString)
    }) 

    bot.respond(/when is sunset in (.*)/i, async function(msg){
        let cityName
       
        cityName = msg.match[1]
        console.log(cityName)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19c4a780bd0f2058ff8b95dd621da84e&units=imperial`

        let response = await axios.get(url)
        let seconds = response.data.sys.sunset
        let date = new Date(seconds *1000)
        let timestr = date.toLocaleTimeString() 
        return msg.send('Sunset in ' + cityName + ' is at ' + timestr)
    }) 

}












