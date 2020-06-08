class AddComments10ToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :comment10, :text
    add_column :game_records, :comment11, :text
    add_column :game_records, :comment12, :text
    add_column :game_records, :comment13, :text
    add_column :game_records, :comment14, :text
    add_column :game_records, :comment15, :text
    add_column :game_records, :comment16, :text
    add_column :game_records, :comment17, :text
    add_column :game_records, :comment18, :text
    add_column :game_records, :comment19, :text
  end
end
