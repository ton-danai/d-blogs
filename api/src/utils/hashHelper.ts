import * as bcrypt from 'bcrypt';

export const compare = (password, hash, salt) => {
  if (password == null || hash == null) {
    throw new Error('password and hash is required to compare');
  }

  const passwordData = hasher(password, salt);

  return passwordData === hash;
};

export const hasher = (password, salt) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const generateSalt = () => {
  return bcrypt.genSaltSync(12);
};
