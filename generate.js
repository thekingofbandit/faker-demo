const faker = require("faker");
const fs = require("fs");
const _ = require("lodash");

const inputs = [];
const outputs = [];

for (let i = 1; i <= 10; i++) {
  const input = {
    id: i,
    category: faker.helpers.randomize(["Science", "Technology", "Religion", "Politics", "Movies"]),
    postDate: faker.date.recent(),
    authorName: faker.name.findName(),
    authorEmailAddress: faker.internet.email(),
    subject: faker.hacker.phrase(),
    postText: faker.lorem.paragraphs(4),
  };

  inputs.push(input)
}


for (let i = 1; i <= 10; i++) {
    const output = {
      id: i,
      category: faker.helpers.randomize(["Science", "Technology", "Religion", "Politics", "Movies"]),
      postDate: faker.date.recent(),
      authorName: faker.name.findName(),
      authorEmailAddress: faker.internet.email(),
      subject: faker.hacker.phrase(),
      postText: faker.lorem.paragraphs(4),
    };
  
    outputs.push(output)
  }

  fs.writeFileSync('scenario.json', JSON.stringify({
        inputs,
        outputs,
    },null,2))
