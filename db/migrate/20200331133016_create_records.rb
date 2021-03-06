class CreateRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :records do |t|
      t.string :title, default: "タイトル未設定"
      t.string :black_player, default: "プレイヤー1"
      t.string :white_player, default: "プレイヤー2"
      t.datetime :date_played, default: DateTime.current
      t.string :place_played, default: "場所未入力"

      t.timestamps
    end
  end
end
