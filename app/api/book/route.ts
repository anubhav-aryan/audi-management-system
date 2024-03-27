import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { regNum } = await req.json();

        const regNoFormat = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
        if (!regNoFormat.test(regNum)) {
            return NextResponse.json({ message: "Invalid regNo format!" }, { status: 400 });
        }

        const seat = await prisma.seat.findFirst({
            where: {
                regNum
            },
        });

        if (!seat) {
            return NextResponse.json({ message: "No seat found!" }, { status: 404 });
        }

        const location = seat.seat;

        seat.isBooked = true;

        await prisma.seat.update({
            where: {
                regNum
            },
            data: seat
        });

        return NextResponse.json({ message: "Seat found!", seat: location }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Your seat has already been assigned!" }, { status: 400 });
    }
};

export async function GET() {
    const seats = await prisma.seat.findMany({})

    return NextResponse.json({ message: "Seats found!", seats });
};