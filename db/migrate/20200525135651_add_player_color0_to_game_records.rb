class AddPlayerColor0ToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :player_color0, :integer, default: 1
  end
end
