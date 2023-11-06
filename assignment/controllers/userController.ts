import {LoginUser, userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id:number): LoginUser | null => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: LoginUser, password: string): boolean {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
