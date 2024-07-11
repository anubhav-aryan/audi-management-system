import data from '@/lib/output';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
    try {
        await prisma.proctorTable.createMany({
            data: data.map((proctor) => {
                return {
                    regNo: proctor.regNo,
                    studentName: proctor.studentName,
                    employeeId: proctor.employeeId.toString(),
                    proctorName: proctor.proctorName,
                    cabin: proctor.cabin.toString(),
                    phoneNumber: proctor.phoneNumber.toString(),
                }
            })
        })

        return NextResponse.json({ message: 'Data imported successfully' });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'An error occurred while importing data' }, { status: 400 });
    }
}