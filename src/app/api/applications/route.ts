import { NextRequest, NextResponse } from "next/server";
import { ApplicationService } from "@/server/application/application.service";
import {
  createApplicationSchema,
  CreateApplicationDTO,
} from "@/server/application/application.dto";
import { ZodError } from "zod";

const service = new ApplicationService();

export async function POST(req: NextRequest) {
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
      return NextResponse.json(
        { message: "Internal server error", detail: error.message },
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
  try {
    const apps = await service.listApplications();
    return NextResponse.json(apps);
  } catch (error: unknown) {
    console.error("[GET /api/applications] error", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
