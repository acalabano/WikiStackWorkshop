var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false},
  status: {
    type: Sequelize.ENUM,
    values: ['open', 'closed']
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, { getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle;
    }
  }, hooks: {
    beforeValidate: function(page) {
      page.urlTitle = page.title.replace((/\s+/g, '_').replace(/\W/g, ''));
    }
  }
});

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

module.exports = {
  Page: Page,
  User: User
};
