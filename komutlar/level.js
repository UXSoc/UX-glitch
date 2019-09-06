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
    .setAuthor(user.tag)
    .addField("Level: ", lvl ? lvl : "0")
    .addField("XP: ", xp ? xp : "0")
    .setFooter(`Level atlamaya kalan son ${xp ? xpToLvl - xp : "0"} XP`)
  message.channel.send(embed);
  
};

exports.conf = {
  enabled: true, //komutut açtık
  guildOnly: true, //sadece servere özel yapmadık
  aliases: [], //farklı çağrılar ekledik
  permLevel: 0 //kimlerin kullanabileceğini yazdık (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'level', //adını belirledik (kullanmak için gereken komut)
  description: 'Seviyenizi gösterir.', //açıklaması
  usage: 'level [@kullanıcı]' //komutun kullanım şekli (mesela hava <bölge>)
};

//komut taslağımız basit anlatımını zaten dosyalarda bulursunuz
//bu ise bizim komut taslağımız
//bunun üzerinden gideceğiz