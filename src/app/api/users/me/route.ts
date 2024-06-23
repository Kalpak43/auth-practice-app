import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    if (token === "") {
      return NextResponse.json(
        {
          error: true,
          message: "User not authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const userId = await getDataFromToken(token);
    const user = await User.findById(userId).select("-password");

    return NextResponse.json({
      message: "User found",
      success: true,
      user: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
