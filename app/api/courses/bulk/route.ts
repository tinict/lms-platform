import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export const GET = async (
    req: Request,
  ) => {
    try {
      const { userId } = auth();
      if (!userId || !isTeacher(userId)) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const course = await db.course.findMany({
        select: {
          id: true,
          userId: true,
        },
        orderBy: {
          createdAt: "desc",
        }
      });
  
      return NextResponse.json(course);
    } catch (error) {
      console.log("[API_GET_COURSES]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };