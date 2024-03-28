/*
  Warnings:

  - You are about to drop the column `name` on the `Session` table. All the data in the column will be lost.
  - Added the required column `accessToken` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "name",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "expires" TIMESTAMP(3),
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "shop" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "userId" BIGINT;
