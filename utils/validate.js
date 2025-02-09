// Example validation function
const validateContactData = (data) => {
    const { firstName, lastName, email, favoriteColor, birthday, phone } = data;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday || !phone) {
      return false;
    }
    return true;
  };
  
  module.exports = { validateContactData };
  