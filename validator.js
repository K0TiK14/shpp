const Validator = {
  validateEmail: function (email) {
    const emailRegex = /^([a-zA-Z0-9][a-zA-Z0-9-.+]{1,19})@([\w.!$%&’*+/=?^-]{1,15})\.([a-zA-Z]{1,5})$/;
    return emailRegex.test(email);
  },

  validatePhone: function (phone) {
    if (phone.length > 25) {
      return false;
    }
    const phoneRegex =
      /^[\s-]*([\s-]*\+[\s-]*3[\s-]*8[\s-]*)?\(?[\s-]*0[\s-]*\d[\s-]*\d[\s-]*\)?[\s-]*\d[\s-]*\d[\s-]*\d[\s-]*\d[\s-]*\d[\s-]*\d[\s-]*\d[\s-]*$/;
    return phoneRegex.test(phone);
  },

  validatePhoneAlt: function (phone) {
    if (phone.length > 25) {
      return false;
    }
    phone = phone.replace(/[\s-]+/g, "");

    const phoneRegex = /^(\+38)?\(?0\d\d\)?[\d]{7}$/;
    return phoneRegex.test(phone);
  },

  validatePassword: function (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w]{8,}$/;
    return passwordRegex.test(password);
  },
};

module.exports = Validator;
