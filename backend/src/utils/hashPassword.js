import bcrypt from "bcrypt";

export function cryptPassword(password) {
    const hashPassword = bcrypt.hash(password, Number(process.env.SALT_HASH_PASSWORD));
    return hashPassword;
}