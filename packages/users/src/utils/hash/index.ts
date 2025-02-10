import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

interface HashData {
  hash: string;
  salt: string;
}

export const hashPassword = async (password: string): Promise<HashData> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return {
    hash: await bcrypt.hash(password, salt),
    salt,
  };
};

export const verifyPassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  const compare = await bcrypt.compare(password, passwordHash);
  return compare;
};
