const Discord = require("discord.js")
const intent_list = new Discord.Intents(["GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS", "GUILD_INVITES"])
const client = new Discord.Client({ ws: { intents: intent_list } })
const token = process.env.token
const welcomeChannelName = "안녕하세요" // 입장 시 환영메시지를 전송 할 채널의 이름을 입력하세요.
const byeChannelName = "안녕히가세요" // 퇴장 시 메시지를 전송 할 채널의 이름을 입력하세요.
const welcomeChannelComment = "어서오세요." // 입장 시 전송할 환영메시지의 내용을 입력하세요.
const byeChannelComment = "안녕히가세요." // 퇴장 시 전송할 메시지의 내용을 입력하세요.
const roleName = "게스트" // 입장 시 지급 할 역할의 이름을 적어주세요.

client.on("ready", () => {
  console.log("켰다.")
  client.user.setPresence({ activity: { name: "!help를 쳐보세요." }, status: "online" })
})

client.on("guildMemberAdd", (member) => {
  const guild = member.guild
  const newUser = member.user
  const welcomeChannel = guild.channels.cache.find((channel) => channel.name == welcomeChannelName)

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`) // 올바른 채널명을 기입하지 않았다면, Cannot read property 'send' of undefined; 오류가 발생합니다.
  member.roles.add(guild.roles.cache.find((r) => r.name === roleName).id)
})

client.on("guildMemberRemove", (member) => {
  const guild = member.guild
  const deleteUser = member.user
  const byeChannel = guild.channels.cache.find((channel) => channel.name == byeChannelName)

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`) // 올바른 채널명을 기입하지 않았다면, Cannot read property 'send' of undefined; 오류가 발생합니다.
})

client.on("message", (message) => {
  if (message.author.bot) return

  if (message.content == "ping") {
    return message.reply("봉쇄")
  }

  if (message.content == "!근찌정보") {
    let img = "https://cdn.discordapp.com/attachments/756326812841279572/788595784648097841/eb9e63e96943a7dd.png"
    let embed = new Discord.MessageEmbed()
      embed.setColor("ff8e8e")
      .setTitle("근찌정보")
      .setURL("http://www.naver.com")
      .setAuthor("근찌", img, "http://www.naver.com")
      .setThumbnail(img)
      .addField("팔로워", "팔로워 158명")
      .addField("나이", "성인", true)
      .addField("생일", "11월22일", true)
      .addField("좋아하는음식", "떡볶이", true)
      .addField("기타정보", "게임은 좋아하지만 재능이\n0개 국어 입니다 한국말로 번역해주세요\n기분에 따라 달라지는 목소리 톤\n순두부 멘탈 (멘탈 나가면 방종..)")
      .setTimestamp()
      .setFooter("화이트해커 가 만듬", img)

    message.channel.send(embed)
  } 
  
  if (message.content == "!현재시간") {
    let embed = new Discord.MessageEmbed
    .setTitle("현재시간")
    .setURL("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%ED%98%84%EC%9E%AC%EC%8B%9C%EA%B0%84")
    .setTimestamp()
    .setFooter("화이트해커 가 만듬")

    message.channel.send(embed)
  }

  if (message.content == "!방송규칙") {
    let img = "https://cdn.discordapp.com/emojis/790597907899744266.png"
    let embed = new Discord.MessageEmbed()
    embed.setColor("ff8e8e")
    .setTitle("방송규칙")
    .setURL("https://www.twitch.tv/geunzzi_/about")
    .setAuthor("근찌", img, "https://www.twitch.tv/geunzzi_/about")
    .setThumbnail(img)
    .addField("규칙:1", "이 방송 주인공은 누구? 근찌임🐹")
    .addField("규칙:2", "시청자 간의 친목 금지입니다")
    .addField("규칙:3", "도배, 시비, 싸우기 금지입니다")
    .addField("규칙:4", "선넘으면'너 밴!'입니다")
    .addField("규칙:5", "지나친 훈수는 좋지 않습니다")
    .addField("규칙:6", "타스트리머 언급 자제해 주세요")
    .addField("규칙:7", "언팔은 NO")
    .addField("규칙:8", "방송과 관련 없는 얘기는 삼가해주세요")

    message.channel.send(embed)
  }

  if (message.content == "!시참규칙") {
    let img = "https://cdn.discordapp.com/attachments/756326812841279572/788595784648097841/eb9e63e96943a7dd.png"
    let embed = new Discord.MessageEmbed()
    embed.setColor("ff8e8e")
    .setTitle("시참규칙")
    .setURL("https://www.twitch.tv/geunzzi_/about")
    .setAuthor("근찌", img, "https://www.twitch.tv/geunzzi_/about")
    .setThumbnail(img)
    .addField("규칙:1", "시참은 팔로우 하셔야 가능합니다(언팔 할 거면 시참 하지 마세요)")
    .addField("규칙:2", "시참 시 디코 대기실에서 대기해 주세요")
    .addField("규칙:3", "닉네임은 디코 닉네임 채널에 써주세요")
    .addField("규칙:4", "과한 주접, 자기 어필 금지입니다")
    .addField("규칙:5", "불편한 행동, 말 자제해주세요")

    message.channel.send(embed)
  }

  if (message.content == "!봉쇄") {
    let img = "https://cdn.discordapp.com/attachments/756326812841279572/790565372632760330/38e2f8f8445ec57636e6f2133228ee5d32d5aa316f3afc85afa8e4ae8c24f63d9d3b2a60945a776682941e178cad6a8f64dc.png"
    let embed = new Discord.MessageEmbed()
  }
  
  else if (message.content == "!도움말") {
    let helpImg = "https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png"
    let commandList = [
      { name: "!도움말", desc: "사용가능" },
      { name: "ping", desc: "사용가능" },
      { name: "!근찌정보", desc: "근찌님 정보를 알려줘요" },
      { name: "!현재시간", desc: "현재시간은 알려줘요" },
      { name: "!방송규칙", desc: "근찌님 방송규칙을 알려줘요" },
      { name: "!청소", desc: "채팅청소 님들 방청소 그런거 아님ㅋㅋ" },
      { name: "!", desc: "서비스준비중" },
      { name: "!", desc: "서비스준비중" },
    ]
    let commandStr = ""
    let embed = new Discord.MessageEmbed().setAuthor("Help of 콜라곰 BOT", helpImg).setColor("#186de6").setFooter(`콜라곰 BOT ❤️`).setTimestamp()

    commandList.forEach((x) => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`
    })

    embed.addField("Commands: ", commandStr)

    message.channel.send(embed)
  }

  if (message.content.startsWith("!전체공지")) {
    if (checkPermission(message)) return
    if (message.member != null) {
      // 채널에서 공지 쓸 때
      let contents = message.content.slice("!전체공지".length)
      message.member.guild.members.cache.array().forEach((x) => {
        if (x.user.bot) return
        x.user.send(`<@${message.author.id}> ${contents}`)
      })

      return message.reply("공지를 전송했습니다.")
    } else {
      return message.reply("채널에서 실행해주세요.")
    }
  }
})

function checkPermission(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true
  } else {
    return false
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str
  limitLen -= tmp.length

  for (let i = 0; i < limitLen; i++) {
    tmp += " "
  }

  return tmp
}

client.login(token)
