"use strict"

require("ignore-styles").default([".css", ".hbs"])

module.exports = {
    require: ["ts-node/register", "ignore-styles", "jsdom-global/register"],
    reporter: "list",
    colors: true
}
