
const qrcode = require('qrcode-terminal');
const currentDate = new Date();
const axios = require('axios');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client(
    {
        authStrategy: new LocalAuth()
    }
);
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});
client.initialize();
client.on('message', async msg => {

    const content = msg.body;
    if (content === "pls meme") 
    {
        const meme = await axios("https://meme-api.herokuapp.com/gimme")
        .then(res=>res.data)
        client.sendMessage(msg.from,await MessageMedia.fromUrl(meme.url))
    }
    else if(content == "Time")
    {
        const time = "Current Time is:- "+currentDate.getHours() +" : "+currentDate.getMinutes()+" : "+currentDate.getSeconds();
        client.sendMessage(msg.from,time)
    }
    else if(content === "pls joke")
    {
        const joke = await axios("https://v2.jokeapi.dev/joke/Any?safe-mode")
        .then(res=>res.data)
        const jokeMsg = await client.sendMessage(msg.from,joke.setup || joke.joke)
        if (joke.delivery) setTimeout(function () {jokeMsg.reply(joke.delivery)},5000)
    }

});





