var validateEmail = function(email) {
  var regEx = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
  return regEx.test(email)
};

module.exports = validateEmail