import User from "@/models/User";
import { connectToDB } from "@/utils/db";

export async function GET(req: Request) {
  const { userEmail, provider } = await req.json();
  try {
    await connectToDB();
    const user = await User.findOne({ email: userEmail, provider });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Failed to fetch user", { status: 500 });
  }
}
