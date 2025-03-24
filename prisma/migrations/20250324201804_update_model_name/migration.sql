/*
  Warnings:

  - You are about to drop the `Commet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Commet";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "commet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "salesperson" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
