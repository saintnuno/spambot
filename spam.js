var Discord = require('discord.js');
var bot = new Discord.Client();
var agent = require('superagent');
var prefix = "&";
bot.on('message', msg => {
var suffix = msg.content.split(' ').slice(1);
//CMDS
if (msg.content.startsWith(prefix + "help")) {
    var help = suffix[0];
    if (!help) {
    msg.channel.sendMessage([
        '```js' + 
        '\nCOMMANDS:' + 
        '\n&spam' +
        '\n&dspam' + 
        '\n&pmspam' + 
        '\n&dpmspam' + 
        '\n&cspam' +
        '```'
    ])
    } else {
     if (help === "spam") {
         msg.channel.sendMessage([
             '```js\nSpams something you said.' + 
             '\n&spam | NUMBER | TO SPAM```'
         ])
     } else
        //PMSPAM
     if (help === "pmspam") {
         msg.channel.sendMessage([
             '```js\nPM Spams someone.' + 
             '\n&pmspam | @USERNAME | NUMBER | TO SPAM```'
         ])
     } else
         //DSPAM
      if (help === "dspam") {
          msg.channel.sendMessage([
             '```js\nSpams something you said, but then deletes.' + 
             '\n&dspam | NUMBER | TO SPAM```' 
          ]) 
      } else 
        //DPMSPAM
    if (help === "dpmspam") {
        msg.channel.sendMessage([
            '```js\nSpams someone, then deletes messages.' + 
            '\n&dpmspam | @USERNAME | NUMBER | TOSPAM```'
        ])
    } else
        //CHANNEL SPAM
    if (help === "cspam") {
        msg.channel.sendMessage([
            '```js\nSpams in a specific channel.' + 
            '\n&cspam | #CHANNEL | NUMBER | TOSPAM```'
        ])
    }
    }
}
//SPAM
    if (msg.content.startsWith(prefix + "spam")) {
    try {
        var timesRun = 0;
        var numberspam = suffix[0];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(2).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
           msg.channel.sendMessage(tospam)
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)
       msg.channel.sendMessage(interval.length);
        } catch (err) {
        console.log(err)
        }
        }
//DELETESPAM
    if (msg.content.startsWith(prefix + "dspam")) {
    try {
        var timesRun = 0;
        var numberspam = suffix[0];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(2).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
           msg.channel.sendMessage(tospam).then(m => {
               m.delete()
           });
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)
       msg.channel.sendMessage(interval.length);
        } catch (err) {
        console.log(err)
        }
        }
//PM
    if (msg.content.startsWith(prefix + "pmspam")) {
        try {
        var usertospam = msg.mentions.users.first();
        var timesRun = 0;
        var numberspam = suffix[1];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(3).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
           usertospam.sendMessage(tospam)
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)

       usertospam.sendMessage(interval.length);
        } catch (err) {
msg.channel.sendMessage("Error, user not found.")
        }
    }
   //PMDELETE
      if (msg.content.startsWith(prefix + "dpmspam")) {
        try {
        var usertospam = msg.mentions.users.first();
        var timesRun = 0;
        var numberspam = suffix[1];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(3).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
           usertospam.sendMessage(tospam).then(m => {
               m.delete()
           });
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)
       usertospam.sendMessage(interval.length);
        } catch (err) {
msg.channel.sendMessage("Error, user not found.")
        }
    }
    //CHANNEL SPAM
    if (msg.content.startsWith(prefix + "cspam")) {
        try {
        var channel = msg.mentions.channels.first();
        var timesRun = 0;
        var numberspam = suffix[1];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(2).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
          bot.channels.get(channel.id).sendMessage(tospam);
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)
      bot.channels.get(channel.id).sendMessage(interval.length);
        } catch(err) {
            console.log(err)
        }
    }
});

bot.login("TOKEN");
//UNHANDLED REJECTION
process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
