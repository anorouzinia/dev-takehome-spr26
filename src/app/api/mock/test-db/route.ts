// import { connectToDatabase } from "@/lib/database/mongoose";
// import { NextResponse } from "next/server";

// export async function GET() {
//   await connectToDatabase();
//   return NextResponse.json({ message: "MongoDB connected!" });
// }


import { connectToDatabase } from "@/lib/database/mongoose";
import Request from "@/lib/models/requests";
import { HTTP_STATUS_CODE } from "@/lib/types/apiResponse";
import { NextResponse } from "next/server";

// export async function GET() {
//   await connectToDatabase();

//   const testRequest = await Request.create({
//     requestorName: "Jane Doe",
//     itemRequested: "Flashlights",
//   });

//   return NextResponse.json(testRequest);
// }


export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { requestorName, itemRequested } = body;

    // validation
    if (
      !requestorName ||
      requestorName.length < 3 ||
      requestorName.length > 30 ||
      !itemRequested ||
      itemRequested.length < 2 ||
      itemRequested.length > 100
    ) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: HTTP_STATUS_CODE.BAD_REQUEST }
      );
    }

    //Create new request
    const newRequest = await Request.create({
      requestorName,
      itemRequested,
      status: "pending", // default status
 
    });

    //Return success
    return NextResponse.json(newRequest, { status: HTTP_STATUS_CODE.CREATED }); // created
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR }
    );
  }
}
