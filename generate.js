module.exports = function() {
    const faker = require("faker");
    const _ = require("lodash");
    return {
        blogPosts: _.times(5, function (n) {
            return {
                id: n,
                category: faker.helpers.randomize(["Science", "Technology", "Religion", "Politics", "Movies"]),
                postDate: faker.date.recent(),
                authorName: faker.name.findName(),
                authorEmailAddress: faker.internet.email(),
                subject: faker.hacker.phrase(),
                postText: faker.lorem.paragraphs(4)
            }
        })
    };
};