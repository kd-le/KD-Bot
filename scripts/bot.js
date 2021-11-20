// Utilize Slack and Hubot
// Have at least 15 phrases you can ask or request from your bot and 2 different categories for your bot. i.e: sports related questions, weather related questions
// Be deployed on Heroku

const axios = require ("axios")


module.exports = function (bot) {
    “Good morning, Matt! There’s no storm in the forecast, but you’ll bring the thunder wearing your T-shirt and shorts.”
    bot.hear(/Good Morning!/, function(res){
        return res.send('Stop talking to me please!')
    })

    bot.hear(/What day is it today?/i, function(res){
        return res.send(new Date().toDateString())

    })

    bot.respond(/What do you want to do today?/i, function(res){
        return res.send("I'm too fat to do anything!")
    })

    bot.respond(/What's the weather in (.*)/i, async function(msg){
        let name
        name = msg.match[1]
        console.log(name)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=19c4a780bd0f2058ff8b95dd621da84e&units=imperial`

        let response = await axios.get(url)
        console.log(response.data)

        
    })

}












