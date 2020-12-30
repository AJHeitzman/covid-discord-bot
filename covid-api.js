const htmlToText = require('html-to-text');

module.exports = {
    manga: async (param) => {
        let res = await kitsu.get('manga?filter[text]=' + param + '&page[limit]=' + suggestLimit);
        let dataRes = res.data[0];

        //sanitizing data
        let replyData = {};
        replyData.url = sanitize(dataRes.posterImage.tiny);
        replyData.title = sanitize(dataRes.canonicalTitle);
        replyData.description = sanitize(dataRes.synopsis);
        replyData.rating = sanitize(dataRes.averageRating);
        replyData.age = sanitize(dataRes.ageRatingGuide);
        replyData.chapters = sanitize(dataRes.chapterCount);
        replyData.status = sanitize(dataRes.status);
        let thumbImg = {url : replyData.url};
        let reply = {
            title: replyData.title,
            description: replyData.description,
            color: 0x00ff00,
            thumbnail: thumbImg,
            fields: [{
                name: 'Avg rating',
                value: replyData.rating,
                inline: true
            },
            {
                name: 'Age rating',
                value: replyData.age,
                inline: true
            },
            {
                name: 'Chapters',
                value: replyData.chapters,
                inline: true
            },
            {
                name: 'Status',
                value: replyData.status,
                inline: true
            },
            {
                name: 'Other top results',
                value: getSuggestions(res.data),
                inline: false
            }]
        };
        return reply;
    }
};
