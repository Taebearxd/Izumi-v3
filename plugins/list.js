const {
	izumi,
	commands,
	mode
} = require("../lib/");
const config = require("../config");
izumi({
	pattern: 'list$',
	fromMe: mode,
	dontAddCommandList: true
}, async (message, match) => {
	let msg = ''
	let no = 1
	commands.map(async (command) => {
		if (command.dontAddCommandList === false && command.pattern !== undefined) {
			msg += `${no++}. ${command.pattern.toString().match(/(\W*)([A-Za-z0-9_ğüşiö ç]*)/)[2].trim()}\n${command.desc}\n\n`
		}
	})
	await message.reply(msg.trim())
})
izumi({
    pattern: 'help$',
    fromMe: mode,
    dontAddCommandList: true
}, async (message, match) => {
    try {
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();

        let msg = `\n╭━━━〔 ${config.BOT_NAME} 〕━━━┈
╭──────────────
🦢⃝۟ꥊ̸̷ │  *𝐎ω𐓣𝖾𝗋*: ${config.OWNER_NAME}
🦢⃝۟ꥊ̸̷ │  *𝐌ⱺᑯ𝖾*: ${config.MODE}
🦢⃝۟ꥊ̸̷ │  *𝐃α𝗍𝖾*: ${formattedDate}
🦢⃝۟ꥊ̸̷ │  *𝐓𝗂ꭑ𝖾*: ${formattedTime}
╰──────────────
╰━━━━━━━━━━━━━━━┈\n\n`;

        commands.forEach(command => {
            if (!command.dontAddCommandList && command.pattern) {
                const patternMatch = String(command.pattern).match(/(\W*)([A-Za-z0-9_ğüşiö ç]*)/);
                if (patternMatch) {
                    msg += `❖ ${patternMatch[2].trim()}\n${command.desc}\n\n`;
                }
            }
        });

        let eypz = {
            key: {
                participant: "0@s.whatsapp.net",
                remoteJid: "120363280001854361@g.us"
            },
            message: {
                productMessage: {
                    product: {
                        productImage: {
                            mimetype: "image/jpeg",
                            jpegThumbnail: Buffer.alloc(0)
                        },
                        title: "Command List",
                        description: "List of available commands",
                        currencyCode: "USD",
                        priceAmount1000: "100000000000000",
                        retailerId: "Eypz",
                        productImageCount: 1
                    },
                    businessOwnerJid: "917994489493@s.whatsapp.net"
                }
            }
        };

        return await message.sendFromUrl(config.MENU_URL, {
            fileLength: "5555544444",
            gifPlayback: true,
            contextInfo: {
                externalAdReply: {
                    title: config.BOT_NAME,
                    body: config.OWNER_NAME,
                    sourceUrl: "https://github.com/sataniceypz/Izumi-v3",
                    mediaUrl: "https://instagram.com",
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: false,
                    thumbnailUrl: "https://izumi-web.vercel.app/image/bot.png"
                }
            },
            caption: msg
        }, {
            quoted: eypz
        });

    } catch (error) {
        console.error('Error occurred:', error);
    }
});
