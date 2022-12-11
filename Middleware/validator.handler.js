const validEmail = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z.]+$/);

const validPassword = new RegExp(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/);

const validFullname = new RegExp(/^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/);

const validTwitter = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);

function validation(value, title) {
  let valid = false;
  if (value === '') {
    return valid;
  }
  switch (title) {
    case 'email':
      if (validEmail.test(value)) {
        valid = true;
      }
      break;
    case 'twitter':
      if (validTwitter.test(value)) {
        valid = true;
      }
      break;
    case 'fullname':
      if (validFullname.test(value)) {
        valid = true;
      }
      break;
    case 'password':
      if (validPassword.test(value)) {
        valid = true;
      }
      break;
    default:
      return false;
  }
  return valid;
}

module.exports = { validation };
