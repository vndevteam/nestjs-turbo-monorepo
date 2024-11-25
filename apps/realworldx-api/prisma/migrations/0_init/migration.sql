-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL DEFAULT '',
    "body" VARCHAR NOT NULL DEFAULT '',
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_article_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_to_tag" (
    "article_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "PK_4c89558cd6aba7068f591dfafb5" PRIMARY KEY ("article_id","tag_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "body" VARCHAR NOT NULL,
    "article_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_comment_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_tag_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "image" VARCHAR NOT NULL DEFAULT '',
    "bio" VARCHAR NOT NULL DEFAULT '',

    CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "user_id" INTEGER NOT NULL,
    "article_id" INTEGER NOT NULL,

    CONSTRAINT "PK_844adcf6e9231c9afb76fe2e4ce" PRIMARY KEY ("user_id","article_id")
);

-- CreateTable
CREATE TABLE "user_follows" (
    "id" SERIAL NOT NULL,
    "follower_id" INTEGER NOT NULL,
    "followee_id" INTEGER NOT NULL,

    CONSTRAINT "PK_user_follows_id" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_article_slug" ON "article"("slug");

-- CreateIndex
CREATE INDEX "IDX_991d528d94da3e1b66444208ed" ON "article_to_tag"("tag_id");

-- CreateIndex
CREATE INDEX "IDX_fd50220e818ef33364f75af495" ON "article_to_tag"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_tag_name" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_user_username" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_user_email" ON "user"("email");

-- CreateIndex
CREATE INDEX "IDX_5238ce0a21cc77dc16c8efe3d3" ON "user_favorites"("user_id");

-- CreateIndex
CREATE INDEX "IDX_57c7c9e22aad40815268f28b5f" ON "user_favorites"("article_id");

-- CreateIndex
CREATE INDEX "UQ_user_follows_followee_id" ON "user_follows"("followee_id");

-- CreateIndex
CREATE INDEX "UQ_user_follows_follower_id" ON "user_follows"("follower_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_user_follows_follower_id_followee_id" ON "user_follows"("follower_id", "followee_id");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "FK_article_user" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "article_to_tag" ADD CONSTRAINT "FK_article_to_tag_article" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_to_tag" ADD CONSTRAINT "FK_article_to_tag_tag" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "FK_comment_article" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "FK_comment_user" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "FK_user_favorites_article" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "FK_user_favorites_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "FK_user_follows_followee_id" FOREIGN KEY ("followee_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "FK_user_follows_follower_id" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

