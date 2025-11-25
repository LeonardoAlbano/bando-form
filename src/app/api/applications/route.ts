import { NextRequest, NextResponse } from "next/server";
import { ApplicationService } from "@/server/application/application.service";
import {
  createApplicationSchema,
  CreateApplicationDTO,
} from "@/server/application/application.dto";
import { ZodError } from "zod";
import { cookies } from "next/headers";
import { checkRateLimit } from "@/server/rate-limit";


const service = new ApplicationService();

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";

      if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { message: "Too many requests" },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    const input: CreateApplicationDTO = createApplicationSchema.parse(body);

    const created = await service.createApplication(input);

    return NextResponse.json(created, { status: 201 });
  } catch (error: unknown) {
    console.error("[POST /api/applications] error", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation error", issues: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      console.error("[POST /api/applications]", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }


    return NextResponse.json(
      { message: "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_auth");

  if (!session || session.value !== "logged-in") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const apps = await service.listApplications();
  return NextResponse.json(apps);
}
