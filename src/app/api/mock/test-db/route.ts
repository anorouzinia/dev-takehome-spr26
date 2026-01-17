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

//smaller pagination size means more pages --> fitting less items per page
const PAGINATION_PAGE_SIZE = 3;

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

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const statusQuery = url.searchParams.get("status");
    const pageQuery = url.searchParams.get("page");
    const page = pageQuery ? parseInt(pageQuery) : 1;

    const filter: any = {};
    const validStatuses = ["pending", "approved", "completed", "rejected"];
    if (statusQuery && validStatuses.includes(statusQuery)) {
      filter.status = statusQuery;
    }

    const requests = await Request.find(filter)
      .sort({ createdAt: -1 }) // sort where newest requests come first
      .skip((page - 1) * PAGINATION_PAGE_SIZE) //skip items from previous pages
      .limit(PAGINATION_PAGE_SIZE);

    const totalCount = await Request.countDocuments(filter); //count of total items that match the filter

    return NextResponse.json({
      page,
      pageSize: PAGINATION_PAGE_SIZE,
      total: totalCount,
      data: requests,
    }, { status: HTTP_STATUS_CODE.OK });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR }
    );
  }
}


export async function PATCH(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { id, status } = body;

    const validStatuses = ["pending", "approved", "completed", "rejected"];
    // check validation of input
    if (!id || !status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid id or status" },
        { status: HTTP_STATUS_CODE.BAD_REQUEST}
      );
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: HTTP_STATUS_CODE.NOT_FOUND }
      );
    }

    return NextResponse.json(updatedRequest, { status: HTTP_STATUS_CODE.OK });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update request" },
      { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR }
    );
  }
}

