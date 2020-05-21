class AddNewLineKifuToRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :new_line_kifu, :string
  end
end
