import Uses from "@/models/Uses";
import { connectToDB } from "@/utils/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");
    const provider = searchParams.get("provider");

    if (!userEmail || !provider) {
      return new Response("Missing query parameters", { status: 400 });
    }

    await connectToDB();

    // Find all usage records for the user and provider
    const uses = await Uses.find({ from: userEmail, provider });

    // Today's and this month's filters
    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    const todayUses = uses.filter((use: any) => {
      return new Date(use.createdAt).toDateString() === today;
    });

    const thisMonthUses = uses.filter((use: any) => {
      const date = new Date(use.createdAt);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    });

    return new Response(
      JSON.stringify({
        totalUses: uses.length,
        todayUses: todayUses.length,
        thisMonthUses: thisMonthUses.length,
        // records: uses, 
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching usage records:", error);
    return new Response("Failed to fetch usage records", { status: 500 });
  }
}
