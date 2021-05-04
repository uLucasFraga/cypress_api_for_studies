/// <reference types="cypress" />

const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = (on, config) => {
  allureWriter(on, config)
  return config
}
