# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_24_104919) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_records", force: :cascade do |t|
    t.string "title", default: "タイトル未設定"
    t.string "black_player", default: "プレイヤー1"
    t.string "white_player", default: "プレイヤー2"
    t.datetime "date_played", default: "2020-05-03 13:48:13"
    t.string "place_played", default: "場所未入力"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.string "kifu"
    t.boolean "from_saved", default: false
    t.string "your_move", default: "second"
    t.index ["user_id"], name: "index_game_records_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.string "remember_digest"
    t.boolean "admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "game_records", "users"
end
