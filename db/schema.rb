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

ActiveRecord::Schema.define(version: 2020_07_07_040115) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_records", force: :cascade do |t|
    t.string "title", default: "タイトル未設定"
    t.string "black_player", default: "プレイヤー1"
    t.string "white_player", default: "プレイヤー2"
    t.datetime "date_played", default: "2020-07-06 12:00:35"
    t.string "place_played", default: "場所未入力"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.string "kifu"
    t.boolean "from_saved", default: false
    t.string "your_move", default: "first"
    t.boolean "vsAI", default: false
    t.boolean "edit_board", default: false
    t.string "board0", default: ""
    t.integer "player_color0", default: 1
    t.text "comment0"
    t.text "comment1"
    t.text "comment2"
    t.text "comment3"
    t.text "comment4"
    t.text "comment5"
    t.text "comment6"
    t.text "comment7"
    t.text "comment8"
    t.text "comment9"
    t.text "comment10"
    t.text "comment11"
    t.text "comment12"
    t.text "comment13"
    t.text "comment14"
    t.text "comment15"
    t.text "comment16"
    t.text "comment17"
    t.text "comment18"
    t.text "comment19"
    t.text "comment20"
    t.text "comment21"
    t.text "comment22"
    t.text "comment23"
    t.text "comment24"
    t.text "comment25"
    t.text "comment26"
    t.text "comment27"
    t.text "comment28"
    t.text "comment29"
    t.text "comment30"
    t.text "comment31"
    t.text "comment32"
    t.text "comment33"
    t.text "comment34"
    t.text "comment35"
    t.text "comment36"
    t.text "comment37"
    t.text "comment38"
    t.text "comment39"
    t.text "comment40"
    t.text "comment41"
    t.text "comment42"
    t.text "comment43"
    t.text "comment44"
    t.text "comment45"
    t.text "comment46"
    t.text "comment47"
    t.text "comment48"
    t.text "comment49"
    t.text "comment50"
    t.text "comment51"
    t.text "comment52"
    t.text "comment53"
    t.text "comment54"
    t.text "comment55"
    t.text "comment56"
    t.text "comment57"
    t.text "comment58"
    t.text "comment59"
    t.text "comment60"
    t.text "comment61"
    t.text "comment62"
    t.text "comment63"
    t.text "comment64"
    t.boolean "searched", default: false
    t.boolean "search_board", default: false
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
