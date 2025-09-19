import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = {
      success: true,
      message: "Data received successfully",
      receivedData: body,
      timestamp: new Date().toISOString(),
    };

    console.log(response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "This is a GET request to the example endpoint" },
    { status: 200 }
  );
}
