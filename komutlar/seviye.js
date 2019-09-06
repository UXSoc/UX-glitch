const Discord = require('discord.js');
const db = require("quick.db");


exports.run = async (client, message) => {

  var user = message.mentions.users.first() || message.author;
  var id = user.id
  var gid = message.guild.id;

  
  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  
  var embed = new Discord.RichEmbed()
    .setAuthor(user.tag, user.avatarURL)
    .setColor(client.color)
    .addField("Seviye: ", lvl ? lvl : "0")
    .addField("XP: ", xp ? xp : "0", true)
    .setFooter(`Seviye atlamaya kalan son ${xp ? xpToLvl - xp : "0"} XP`)
  message.channel.send(embed);
  
  
  
  
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [], 
  permLevel: 0,
  kategori: "Seviye Komutları"
};

exports.help = {
  name: 'seviye', 
  description: 'Kullanıcının seviyesini gösterir.', 
  usage: 'seviye [@kullanıcı]'
};