import jwt from "jsonwebtoken";

export const getDataFromToken = (token: string) => {
  try {
    const tokenData: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    
    return tokenData.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
