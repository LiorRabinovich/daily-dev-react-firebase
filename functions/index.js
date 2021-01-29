const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Parser = require('rss-parser');
const serviceAccount = require("./firebase.config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const parser = new Parser();
const Timestamp = admin.firestore.Timestamp;
const NoImageAvailable = 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg';

function getImage(item) {
    try {
        return item.content.split('src="')[1].split('"')[0]
    } catch {
        return NoImageAvailable;
    }
}

// This will be run every day at 11:05 AM Jerusalem!
module.exports.getFeed = functions.pubsub.schedule('5 11 * * *')
    .timeZone('Israel/Jerusalem')
    .onRun(async (context) => {
        const feedUrl = 'https://medium.com/feed/topic/javascript'
        const feed = await parser.parseURL(feedUrl);
        functions.logger.info({ feed }, { structuredData: true });
        feed.items.forEach((item) => {
            firestore.collection('posts').add({
                title: item.title,
                link: item.link,
                createdAt: Timestamp.now().toMillis(),
                creator: item.creator,
                image: getImage(item)
            })
        })
    });
