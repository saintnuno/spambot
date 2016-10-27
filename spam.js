var Discord = require('discord.js');
var bot = new Discord.Client();
var agent = require('superagent');
var prefix = "&";
var commanders = 'YOURID';
bot.on('message', msg => {
var suffix = msg.content.split(' ').slice(1);
//CMDS
if (msg.content.startsWith(prefix + "help")) {
    if (commanders.indexOf(msg.author.id) > -1) {
    var help = suffix[0];
    if (!help) {
    msg.channel.sendMessage([
        '```js' + 
        '\nCOMMANDS:' + 
        '\n&spam' +
        '\n&dspam' + 
        '\n&pmspam' + 
        '\n&dpmspam' + 
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
    }
    }
    }
}
//SPAM
    if (msg.content.startsWith(prefix + "spam")) {
    try {
    if (commanders.indexOf(msg.author.id) > -1) {
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
       msg.channel.sendMessage(interval.length)
        }
        } catch (err) {
        console.log(err)
        }
        }
//DELETESPAM
    if (msg.content.startsWith(prefix + "dspam")) {
    try {
        if (commanders.indexOf(msg.author.id) > -1) {
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
       msg.channel.sendMessage(interval.length)
    
        }
        } catch (err) {
        console.log(err)
        }
        }
//PM
    if (msg.content.startsWith(prefix + "pmspam")) {
        try {
        if (commanders.indexOf(msg.author.id) > -1) {
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

       usertospam.sendMessage(interval.length)
        }
        } catch (err) {
msg.channel.sendMessage("Error, user not found.")
        }
    }
   //PMDELETE
      if (msg.content.startsWith(prefix + "dpmspam")) {
        try {
        if (commanders.indexOf(msg.author.id) > -1) {
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

       usertospam.sendMessage(interval.length)
        }
        } catch (err) {
msg.channel.sendMessage("Error, user not found.")
        }
    }
    
});

bot.login("TOKEN");
//UNHANDLED REJECTION
process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
