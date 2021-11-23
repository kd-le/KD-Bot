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

//weather api
    bot.respond(/What's the temp in (.*)/i, async function(msg){
        let cityName
        cityName = msg.match[1]
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
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19c4a780bd0f2058ff8b95dd621da84e&units=imperial`

        let response = await axios.get(url)
        return msg.send(response.data.weather[0].description)
    })

        bot.respond(/when is sunrise in (.*)/i, async function(msg){
        let cityName
        cityName = msg.match[1]
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
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19c4a780bd0f2058ff8b95dd621da84e&units=imperial`

        let response = await axios.get(url)
        let seconds = response.data.sys.sunset
        let date = new Date(seconds *1000)
        let timestr = date.toLocaleTimeString() 
        return msg.send('Sunset in ' + cityName + ' is at ' + timestr)
    }) 

    //Bored API
    bot.respond(/I don't have any friends. What should I do for fun?/i, async function(msg){
        let url = `http://www.boredapi.com/api/activity?participants=1`

        let response = await axios.get(url) 
        let activity = response.data.activity
        let lowerActivity = activity.toLowerCase();
        return msg.send('You can ' + lowerActivity + '. But you should probably make some friends...')
    }) 

    bot.respond(/I'm having friends over. What can we do with (.*) people/i, async function(msg){
        let numFriend
        numFriend = msg.match[1]
        let url = `http://www.boredapi.com/api/activity?participants=${numFriend}`
        let response = await axios.get(url) 
        let activity = response.data.activity
        let lowerActivity = activity.toLowerCase()
        return msg.send('You can ' + lowerActivity + '.') 
    }) 

    bot.respond(/I don't have any money. What can I do for fun?/i, async function(msg){
        let url = `http://www.boredapi.com/api/activity?price=0.0`

        let response = await axios.get(url) 
        let activity = response.data.activity
        let lowerActivity = activity.toLowerCase();
        return msg.send(`You need to manage your money better! But for now, you can ` + lowerActivity + '.')
    }) 

    bot.respond(/What should I cook for dinner?/i, async function(msg){
        let url = `http://www.boredapi.com/api/activity?type=cooking`

        let response = await axios.get(url) 
        let activity = response.data.activity
        let lowerActivity = activity.toLowerCase();
        return msg.send(`You can ` + lowerActivity + '.')
    }) 

    bot.respond(/Christmas is coming but I'm broke. What can I make for family?/i, async function(msg){
        let url = `http://www.boredapi.com/api/activity?type=diy&price=0.0`

        let response = await axios.get(url) 
        let activity = response.data.activity
        let lowerActivity = activity.toLowerCase();
        return msg.send(`I feel bad for your family! You can ` + lowerActivity + '.')

    })
    
    bot.respond(/This slackbot project is stressing me out. What can I do to relax?/i, async function(msg){
        let url = `http://www.boredapi.com/api/activity?type=relaxation`
        let response = await axios.get(url) 
        let activity = response.data.activity
        let lowerActivity = activity.toLowerCase();
        return msg.send(`You can ` + lowerActivity + '.')

    })

    bot.respond(/I haven't got out of the house for so long. What social thing can I do?/i, async function(msg){
        let url = `http://www.boredapi.com/api/activity?type=social`
        let response = await axios.get(url) 
        let activity = response.data.activity
        let lowerActivity = activity.toLowerCase();
        return msg.send(`You can ` + lowerActivity + '.')

    })
    
}












