// app/api/get-api-key/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.redirect("/signin", 302);
  }

  await connectToDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return new Response("User not found", { status: 404 });

  return new Response(JSON.stringify({ apiKey: user.apiKey }));
}
