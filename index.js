const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '?';
const welcomeChannelID = "865328514533949520";
const rulesChannelID = "865328064158498838";
const rules = require("./pravidla");
const memberRole = "865673628138078229";
const moderatorRole = "865325952275054604";
const helperRole = "865326287593275423";
const supportChannelID = "865331109822726154";
const fanatixID = "399946430346690580";
const everyoneID = "865278193329111082";
const supportCategoryID = "880472669059956777";

client.once('ready', () => {
    console.log('Up and running!');
    /*let rulesEmbed = new Discord.MessageEmbed()
        .setTitle("__**Pravidla**__","*(pouze na discordu)*")
        .setAuthor("Azuremic", "https://i.imgur.com/m4hkkIj.png")
        .setColor(1752220)
        .addFields(
            {name: '**Obecná Pravidla**', value: '**1.** Zákaz jakých koliv urážlivých výrazů včetně rasismu, homofobie, atd.\n **2.** Zákaz všeho NSFW včetně goru.\n **3.** Zákaz scamování, reklama, žebrání, atd. jak na serveru tak v soukromých zprávách.\n **4.** Zákaz předstírání, že jste člen Admin Teamu, hráče nebo bota.\n **5.**Zákaz urážení nebo lhaní Admin Teamu nebo hráčům.\n **6.** Vedlejší účty jsou povoleny pouze pro účel testování. Používání vedlejších účtů k obcházení trestů bude považováno jako porušení pravidel.\n'},
            //{name: '\u200B', value: '\u200B'},
            {name: '**Voice Chat Pravidla**', value: '**1.** Zákaz natáčení audia nebo videa bez povolení od všech účastníků.\n **2.** Zákaz používání soundboardu nebo přehrávání earrapu.'},
            //{name: '\u200B', value: '\u200B'},
            {name: '**Pravidla Profilů**', value: '**1.** Předstírání členů Admin Teamu, hráčů nebo botů pomocí profilovek nebo jmen je zakázáno.\n **2.** Zákaz používání neviditelných jmen nebo jmen, která se nedají tagovat.\n **3.** Zákaz všech NSFW nebo ofenzivních profilovek.\n**4.** Každý hráč si musí nastavit nickname stejný jako ho mají ve hře.'},
        )
        .setFooter("Tým Azuremic", "https://i.imgur.com/m4hkkIj.png")
        .setTimestamp()
    client.channels.cache.get(rulesChannelID).send(rulesEmbed).then(sentEmbed => {
        sentEmbed.react('✅');
    
    });*/
    /*let supportEmbed = new Discord.MessageEmbed()
        .setColor(1752220)
        .setAuthor("Azuremic", "https://i.imgur.com/m4hkkIj.png")
        .addFields(
            {name: '**Podpora Azuremic**', value: 'Reaguj pomocí 🔧 k vytvoření ticketu'}
        )
        .setFooter("Tým Azuremic", "https://i.imgur.com/m4hkkIj.png")
        .setTimestamp()
    client.channels.cache.get(supportChannelID).send(supportEmbed).then(sentEmbed => {
        sentEmbed.react('🔧');
    });*/
    client.channels.cache.get(rulesChannelID).messages.fetch({ limit: 1 }).then(messages => {var lastMessage = messages.first();});
    client.channels.cache.get(supportChannelID).messages.fetch({ limit: 1 }).then(messages => {var lastMessage = messages.first();});
});

client.on('messageReactionAdd', async (reaction, user, message) =>{
    console.log(`message reaction: ${reaction.name}`);
    if(user.bot) return;
    if(reaction.message.channel.id == rulesChannelID){
        console.log('pravidla');
        if(reaction.emoji.name == '✅'){
            reaction.message.guild.members.cache.get(user.id).roles.add(memberRole);
            console.log(`Role Member added to ${user}`);
        } else {
            return;
        }
    } else if(reaction.message.channel.id == supportChannelID){
        console.log('support');
        if(reaction.emoji.name== '🔧'){
            let guild = reaction.message.guild;
            let supportChannel = await guild.channels.create(`Podpora - ${user.username}`, {
                type: 'text',
                parent: supportCategoryID,
                })
                .then(channel => {
                    channel.overwritePermissions([
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS'],
                        },
                        {
                            id: moderatorRole,
                            allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'ATTACH_FILES'],
                        },
                        {
                            id: helperRole,
                            allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'ATTACH_FILES'],
                        },
                        {
                            id: memberRole,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: everyoneID,
                            deny: ['VIEW_CHANNEL'],
                        },
                    ]);
                    let supportChannelEmbed = new Discord.MessageEmbed()
                        .setColor(1752220)
                        .setAuthor("Azuremic", "https://i.imgur.com/m4hkkIj.png")
                        .addFields(
                            {name: `Podpora ${user.username}`, value: 'Počkej na někoho z Admin Teamu prosím'}
                        )
                    client.channels.cache.get(channel.id).send(`<@${user.id}>`);
                    client.channels.cache.get(channel.id).send(supportChannelEmbed);
                });
        }
    }
});

client.on('guildMemberAdd' , (member) => {
    console.log(member);
    //member.guild.channels.cache.get(welcomeChannelID).send(`Vítej, <@${member.user.id}> na Azuremic! Přečti si prosím pravidla v <#865328064158498838> a potvrď je pomocí ✅ abys dostal přístup ke zbytku serveru`);
    const welcomeEmbed = new Discord.MessageEmbed()
        .setColor(1752220)
        .setDescription(`Vítej, <@${member.user.id}> na Azuremic! Přečti si prosím pravidla v <#865328064158498838> a potvrď je pomocí ✅ abys dostal přístup ke zbytku serveru`)
    member.guild.channels.cache.get(welcomeChannelID).send(welcomeEmbed);
});


client.login('ODY1MzM3MTMyOTY0NTExNzk0.YPCiAQ.RmbuI4r5Jbo-GEQWDprX9ePP9H0')