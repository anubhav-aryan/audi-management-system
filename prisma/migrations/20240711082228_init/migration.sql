-- CreateTable
CREATE TABLE "ProctorTable" (
    "id" TEXT NOT NULL,
    "regNo" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "proctorName" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "cabin" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "ProctorTable_pkey" PRIMARY KEY ("id")
);
