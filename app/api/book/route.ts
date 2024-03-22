import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { regNo } = await req.json();

        const regNoFormat = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
        if (!regNoFormat.test(regNo)) {
            return NextResponse.json({ message: "Invalid regNo format!" }, { status: 400 });
        }

        const seat = await prisma.seat.findFirst({
            where: {
                regNo: null
            },
            orderBy: {
                id: 'asc'
            }
        });

        if (!seat) {
            return NextResponse.json({ message: "No seats found!" }, { status: 404 });
        }

        const updatedSeat = await prisma.seat.update({
            where: {
                id: seat.id
            },
            data: {
                regNo: regNo
            }
        });

        const location = updatedSeat.location;

        return NextResponse.json({ message: "Seat assigned!", seat: location }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Your seat has already been assigned!" }, { status: 400 });
    }
};

export async function GET() {
    const auditorium = await prisma.auditorium.create({
        data: {}
    });

    // Create 40 rows
    for (let i = 1; i <= 40; i++) {
        const row = await prisma.row.create({
            data: {
                auditoriumId: auditorium.id
            }
        });

        // Prepare data for 44 seats in the row
        const seatsData = Array.from({ length: 44 }, (_, j) => ({
            location: `Row ${i} Column ${j + 1}`,
            rowId: row.id
        }));

        // Create 44 seats in the row in bulk
        await prisma.seat.createMany({
            data: seatsData
        });
    }

    return NextResponse.json({ message: "Auditorium created!" });
};