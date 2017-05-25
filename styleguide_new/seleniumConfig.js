module.exports = {
  drivers: {
    chrome: {
      version: '2.29',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    },
  },
}
// TODO automate the install of the proper webdriver
// 454  cp ~/Downloads/chromedriver /Users/pivotal/workspace/pivotal-ui/styleguide_new/node_modules/selenium-standalone/.selenium/chromedriver/2.29-x64-chromedriver
// 455  selenium-standalone start --config=./seleniumConfig.js