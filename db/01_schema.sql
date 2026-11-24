
-- Music Man - Prototype 2
-- db/01_schema.sql
-- Based on Analyst Level 2 Specification

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS "User" (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Song" (
    song_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID NOT NULL REFERENCES "User"(user_id),
    title TEXT NOT NULL,
    artist TEXT,
    audio_file_path TEXT
);

CREATE TABLE IF NOT EXISTS "PracticeSetting" (
    setting_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    song_id UUID NOT NULL REFERENCES "Song"(song_id),
    tempo_bpm INTEGER CHECK (tempo_bpm > 0),
    loop_start_seconds NUMERIC CHECK (loop_start_seconds >= 0),
    loop_end_seconds NUMERIC,
    count_in_beats INTEGER CHECK (count_in_beats >= 0),
    CONSTRAINT valid_loop CHECK (
        loop_start_seconds IS NULL
        OR loop_end_seconds IS NULL
        OR loop_end_seconds > loop_start_seconds
    )
);

CREATE TABLE IF NOT EXISTS "Setlist" (
    setlist_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID NOT NULL REFERENCES "User"(user_id),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "SetlistSong" (
    setlist_song_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setlist_id UUID NOT NULL REFERENCES "Setlist"(setlist_id),
    song_id UUID NOT NULL REFERENCES "Song"(song_id),
    position INTEGER NOT NULL CHECK (position > 0),
    transition_note TEXT,
    UNIQUE (setlist_id, position)
);

CREATE TABLE IF NOT EXISTS "ShareRecord" (
    share_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID NOT NULL REFERENCES "User"(user_id),
    song_id UUID NOT NULL REFERENCES "Song"(song_id),
    share_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
