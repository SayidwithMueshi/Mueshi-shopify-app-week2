-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charities" (
    "id" TEXT NOT NULL,
    "website" TEXT,
    "active" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "name" TEXT,
    "address" JSONB,
    "hero_media" TEXT,
    "social_media" JSONB,
    "mueshi_partner" BOOLEAN,
    "email" TEXT,
    "bio" TEXT,
    "phone_number" TEXT,
    "currently_raised" TEXT,
    "revenue_share" BIGINT,
    "goal" BIGINT,
    "user_id" TEXT,
    "fundraiser_type" TEXT,
    "organizer" TEXT,
    "profile_media" JSONB,
    "hashtags" TEXT,
    "category" TEXT,
    "selected_charity" TEXT,
    "beneficiary" TEXT,
    "zip_code" TEXT,
    "campaign_questionnaire" JSONB,
    "organization" TEXT,

    CONSTRAINT "charities_pkey" PRIMARY KEY ("id")
);
