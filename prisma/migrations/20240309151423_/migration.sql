-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "additional" TEXT[],

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);
