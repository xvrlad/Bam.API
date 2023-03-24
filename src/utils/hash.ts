import bcrypt from "bcrypt";
import config from "config";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(
    parseInt(config.get<string>("saltWorkFactor"))
  );

  const hash = await bcrypt.hashSync(password, salt);

  return { hash, salt };
}

export async function verifyPassword({
  candidatePassword,
  salt,
  hash,
}: {
  candidatePassword: string;
  salt: string;
  hash: string;
}) {
  const candidateHash = await bcrypt.hashSync(candidatePassword, salt);

  return candidateHash === hash;
}
