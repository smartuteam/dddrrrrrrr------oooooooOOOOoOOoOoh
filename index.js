var tokens = require ("./tokens.js"),
configs = {
  token: process.env.TOKEN,
  prefix: "#",
  guildID: '635142447281995784',
  userID: '487573710887321600',
  repChannel: {
    id: '635152148216152075'
  },
  invite: {
    code: "invite code of spam guild"
  }
},
client = new (require ("discord.js")).Client (),
clients = [],
gml = ["hi brother", "i love you man", "you are bad at this", "stop use ! please", "i hate you stooop!", "oh god, fuve you!", "lol that's losers game", "loser."];
client.login (configs.token).then (async token => {
  tokens.forEach (async token => {
    var c1 = new (require ("discord.js")).Client ();
    c1.login (token).then (async token => {
      clients.push (c1);
      setInterval (async () => {
        var text = gml[Math.floor (Math.random () * gml.length)],
        guild = c1.guilds.get (configs.guildID),
        channel = guild ? guild.channels.filter (c => c.type == "text" && c.name != "false").random () : null;
        if (!guild) {
          await require ("request") ({
            method: "POST",
            url: `https://discordapp.com/api/v6/invite/${configs.invite.code}`,
            headers: {
              authorization: token
            }
          });
        }
        channel.send (text);
      }, 50000);
      setInterval (() => {
        var channel = c1.channels.get (configs.repChannel.id);
        if (!channel) return undefined;
        channel.send ("#rep");
        channel.send ("#daily");
        channel.awaitMessages (m => m.author.id == "282859044593598464").then (collected => {
          var message = collected.first ();
          if (message.content.includes ("could")) {
            channel.send (`#rep ${configs.userID}`);
          }
        });
      }, 60000);
    }).catch (err => {
      console.error ("this token is wrong!" + token);
    });
  });
}).catch (err => {
  console.err (err);
});
