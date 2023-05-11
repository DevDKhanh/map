import jwt from "jwt-simple";

export const signJWT = (payload: any) => {
  const expirationTime = 30; // Thời gian hết hạn (tính bằng giây)
  const expires = Date.now() + expirationTime * 1000;

  const tokenPayload = {
    payload: payload,
    exp: expires / 1000,
  };
  return jwt.encode(
    tokenPayload,
    `${process.env.NEXT_PUBLIC_JWT_SECRET}`,
    "HS256"
  );
};

export function verifyToken(token: string) {
  const secret = `${process.env.NEXT_PUBLIC_JWT_SECRET}`;
  try {
    const decoded = jwt.decode(token, secret, false, "HS256");
    const expires = decoded.exp;

    if (Date.now() >= expires * 1000) {
      return false;
    }

    return decoded;
  } catch (err) {
    return false;
  }
}
