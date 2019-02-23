const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Address = conn.define('address', {
  place: Sequelize.JSON,
  name: {
    type: Sequelize.VIRTUAL,
    get: function(){
      return this.place.formatted_address;
    }
  }
});

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
};

module.exports = {
  syncAndSeed,
  models: {
    Address
  }
};
