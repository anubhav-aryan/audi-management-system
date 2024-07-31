import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { regNum } = await req.json();

        const regNoFormat = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
        if (!regNoFormat.test(regNum)) {
            return NextResponse.json({ message: "Invalid Registration Number Format!" }, { status: 400 });
        }

        const proctor = await prisma.convocationTable.findFirst({
            where: {
                regNo: regNum
            },
        });

        if (!proctor) {
            return NextResponse.json({ message: "No proctor found!" }, { status: 404 });
        }

        return NextResponse.json({ message: "No Proctor Found!", proctor: proctor }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "No Proctor Found!" }, { status: 400 });
    }
};
