const { create, Client } = require('@open-wa/wa-automate');

create().then(client => start(client));

function start(client) {
    client.onMessage(async message => {
        console.log(message);

        if (message.body === 'menu') {
            await client.sendText(message.from, 'Welcome to the bot! Here are your options:\n1. Download media\n2. Check status');
        } else if (message.body.startsWith('http')) {
            await downloadMedia(message.body, client, message.from);
        } else if (message.body === 'status') {
            await client.sendText(message.from, 'The bot is running and online!');
        }
    });
}

async function downloadMedia(link, client, from) {
    try {
        const media = await client.downloadMedia({ url: link });
        if (media) {
            await client.sendFile(from, media, 'downloaded_media', 'Here is your media');
        } else {
            await client.sendText(from, 'Sorry, I could not download the media from the link.');
        }
    } catch (err) {
        console.error('Error downloading media:', err);
        await client.sendText(from, 'There was an error while downloading the media.');
    }
}