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
        const [row, column] = location.split("-");
        const seatMessage = `Row ${row} Column ${column}`;

        return NextResponse.json({ message: "Seat assigned!", seat: seatMessage }, { status: 404 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 404 });

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

        // Create 44 seats in each row
        for (let j = 1; j <= 44; j++) {
            await prisma.seat.create({
                data: {
                    location: `${i}-${j}`,
                    rowId: row.id
                }
            });
        }
    }
    return NextResponse.json({ message: "Auditorium created!" });
};