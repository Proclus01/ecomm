const helpers = {
  getError(errors, prop) {
    try {
      return errors.mapped()[prop].msg;
    } catch (err) {
      return "";
    }
  },
};

export default helpers;
