-- Users Table
CREATE TABLE "users" (
    "id" UUID DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL
);

ALTER TABLE "users" ADD PRIMARY KEY("id");

CREATE INDEX "users_name_index" ON "users" ("name");
CREATE INDEX "users_email_index" ON "users" ("email");

-- Projects Table --
CREATE TABLE "projects" (
    "id" UUID DEFAULT gen_random_uuid(),
    "project_name" VARCHAR(255) NOT NULL,
    "description" TEXT NULL,
    "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "projects" ADD PRIMARY KEY("id");

CREATE INDEX "projects_project_name_index" ON "projects" ("project_name");

-- Tasks Table --
CREATE TABLE "tasks" (
    "id" SERIAL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NULL,
    "status" VARCHAR(50) NOT NULL,
    "project_id" UUID NOT NULL,
    "created_by" UUID NOT NULL,
    "assignee_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "tasks" ADD PRIMARY KEY("id");

ALTER TABLE "tasks"
ADD CONSTRAINT "tasks_project_id_fkey"
FOREIGN KEY("project_id")
REFERENCES "projects"("id");

ALTER TABLE "tasks"
ADD CONSTRAINT "tasks_assignee_id_fkey"
FOREIGN KEY("assignee_id")
REFERENCES "users"("id");

ALTER TABLE "tasks"
ADD CONSTRAINT "tasks_created_by_fkey"
FOREIGN KEY("created_by")
REFERENCES "users"("id");

CREATE INDEX "tasks_title_index" ON "tasks" ("title");
CREATE INDEX "tasks_status_index" ON "tasks" ("status");

-- Roles Table --
CREATE TABLE "roles" (
    "id" UUID DEFAULT gen_random_uuid(),
    "role_name" VARCHAR(100) NOT NULL
);

ALTER TABLE "roles" ADD PRIMARY KEY("id");

CREATE INDEX "roles_role_name_index" ON "roles" ("role_name");

-- Project Members Table --
CREATE TABLE "project_members" (
    "id" UUID DEFAULT gen_random_uuid(),
    "project_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL
);

ALTER TABLE "project_members" ADD PRIMARY KEY("id");

ALTER TABLE "project_members"
ADD CONSTRAINT "project_members_project_id_fkey"
FOREIGN KEY("project_id")
REFERENCES "projects"("id");

ALTER TABLE "project_members"
ADD CONSTRAINT "project_members_user_id_fkey"
FOREIGN KEY("user_id")
REFERENCES "users"("id");

ALTER TABLE "project_members"
ADD CONSTRAINT "project_members_role_id_fkey"
FOREIGN KEY("role_id")
REFERENCES "roles"("id");

CREATE INDEX "project_members_project_id_index" ON "project_members" ("project_id");
CREATE INDEX "project_members_user_id_index" ON "project_members" ("user_id");
CREATE INDEX "project_members_role_id_index" ON "project_members" ("role_id");