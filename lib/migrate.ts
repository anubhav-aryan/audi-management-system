import { PrismaClient } from '@prisma/client';
import * as fs from 'fs/promises';

let prisma: PrismaClient;

prisma = new PrismaClient();

async function migrateData() {
    const data = JSON.parse(await fs.readFile('../output.json', 'utf8'));

    
    await prisma.proctorTable.createMany({
        data: data.map((proctor: any) => {
            return {
                regNo: proctor.regNo,
                studentName: proctor.studentName,
                employeeId: proctor.employeeId.toString(),
                proctorName: proctor.proctorName,
                cabin: proctor.cabin.toString(),
                phoneNumber: proctor.phoneNumber.toString(),
            }
        })
    });
    console.log("Done")
}

migrateData().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    console.log("done!")
    await prisma.$disconnect();
});