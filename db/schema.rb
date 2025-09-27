# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_09_14_065009) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "RefreshToken", id: :text, force: :cascade do |t|
    t.text "hashedToken", null: false
    t.text "userId", null: false
    t.datetime "expiresAt", precision: 3, null: false
    t.datetime "createdAt", precision: 3, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "revokedAt", precision: 3
    t.text "replacedById"
    t.text "ip"
    t.text "userAgent"
    t.index ["hashedToken"], name: "RefreshToken_hashedToken_key", unique: true
    t.index ["replacedById"], name: "RefreshToken_replacedById_key", unique: true
  end

  create_table "User", id: :text, force: :cascade do |t|
    t.text "name"
    t.text "email", null: false
    t.text "password", null: false
    t.datetime "createdAt", precision: 3, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updatedAt", precision: 3, null: false
    t.index ["email"], name: "User_email_key", unique: true
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "ip_address"
    t.string "user_agent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email_address", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["email_address"], name: "index_users_on_email_address", unique: true
  end

  add_foreign_key "RefreshToken", "RefreshToken", column: "replacedById", name: "RefreshToken_replacedById_fkey", on_update: :cascade, on_delete: :nullify
  add_foreign_key "RefreshToken", "User", column: "userId", name: "RefreshToken_userId_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "sessions", "users"
end
