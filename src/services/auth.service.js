import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcryptjs';

export class AuthService {
  usersRepository = new UsersRepository();

  //회원가입
  signUp = async (email, nickname, password, isOwner) => {
    const existuser = await this.usersRepository.FindUserbyEmail(email);
    if (existuser) {
      return 'userExist';
    }
    const hash = await bcrypt.hash(password, 10);
    return await this.usersRepository.signUp(email, hash, nickname, isOwner);
  };
}
