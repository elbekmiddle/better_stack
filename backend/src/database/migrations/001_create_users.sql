CREATE TYPE user_role AS ENUM ('owner', 'admin', 'member', 'viewer');
CREATE TYPE auth_provider AS ENUM ('local', 'google', 'both');

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) NOT NULL UNIQUE,
  password      VARCHAR(255),
  full_name     VARCHAR(255),
  avatar_url    VARCHAR(500),
  role          user_role NOT NULL DEFAULT 'member',
  provider      auth_provider NOT NULL DEFAULT 'local',
  google_id     VARCHAR(255),
  is_verified   BOOLEAN NOT NULL DEFAULT false,
  timezone      VARCHAR(100) DEFAULT 'UTC',
  language      VARCHAR(10) DEFAULT 'en',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);