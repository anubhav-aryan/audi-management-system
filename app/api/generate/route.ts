import data from '@/lib/output';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
    try {
        const auditorium = await prisma.auditorium.create({
            data: {}
        })

        await prisma.seat.createMany({
            data: data.map((seat) => {
                return {
                    auditoriumId: auditorium.id,
                    ...seat
                }
            })
        })

        return NextResponse.json({ message: 'Data imported successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while importing data' }, { status: 400 });
    }
}