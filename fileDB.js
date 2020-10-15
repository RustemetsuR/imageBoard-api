const fs = require("fs");
const {nanoid} = require("nanoid");

const fileName = "./db.json";
let data = [];

module.exports = {
  init() {
    try {
      data = JSON.parse(fs.readFileSync(fileName));
    } catch(e) {
      data = [];
    }
  },
  getItems() {
    return data;
  },
  save() {
    fs.writeFileSync(fileName, JSON.stringify(data));
  },
  addItem(item) {
    if(item.author === ''){
        item.author = 'Anon';
    };
    item.id = nanoid();
    data.push(item);
    this.save();
    return item;
  }
};