const idiomatic = require('stylelint-config-idiomatic-order');
const idiomaticRules = idiomatic.rules['order/properties-order'] || idiomatic.rules['declaration-block-properties-order'];
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'order/properties-order': idiomaticRules,
  },
};
