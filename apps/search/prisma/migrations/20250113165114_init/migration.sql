-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "terms" TEXT[],

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);
