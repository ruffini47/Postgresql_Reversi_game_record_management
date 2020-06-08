class AddComments60ToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :comment60, :text
    add_column :game_records, :comment61, :text
    add_column :game_records, :comment62, :text
    add_column :game_records, :comment63, :text
    add_column :game_records, :comment64, :text
  end
end
