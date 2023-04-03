const { createClient } = require("redis");
const todos = require("../fixtures/todos.json");

let client = createClient({});

module.exports = {
  populateRedis: async () => {
    await client.connect();
    await client.flushAll();

    for await (const bucket of Object.keys(todos)) {
      const content = JSON.stringify(todos[bucket]);
      await client.set(bucket, content);
    }
  },
  disconnect: async () => {
    await client.disconnect();
    return void 0;
  },
};
