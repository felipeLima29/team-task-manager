import bcrypt from "bcrypt";

export async function comparePassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
}