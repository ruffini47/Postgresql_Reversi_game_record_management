class AddComments30ToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :comment30, :text
    add_column :game_records, :comment31, :text
    add_column :game_records, :comment32, :text
    add_column :game_records, :comment33, :text
    add_column :game_records, :comment34, :text
    add_column :game_records, :comment35, :text
    add_column :game_records, :comment36, :text
    add_column :game_records, :comment37, :text
    add_column :game_records, :comment38, :text
    add_column :game_records, :comment39, :text
  end
end
