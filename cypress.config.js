const { defineConfig } = require("cypress");
const { createClient } = require("redis");
const todos = require("./cypress/fixtures/todos.json");

/**
 * Clear Redis and loads all necessary data for testing;
 */
const beforeBrowserLaunch = async () => {
  const client = createClient({});
  await client.connect();
  await client.flushAll();

  for await (const bucket of Object.keys(todos)) {
    const content = JSON.stringify(todos[bucket]);
    await client.set(bucket, content);
  }
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", beforeBrowserLaunch);
    },
    video: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    video: false,
    setupNodeEvents(on, config) {
      on("before:browser:launch", beforeBrowserLaunch);
    },
  },
  unit: {},
});
