class AddComments50ToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :comment50, :text
    add_column :game_records, :comment51, :text
    add_column :game_records, :comment52, :text
    add_column :game_records, :comment53, :text
    add_column :game_records, :comment54, :text
    add_column :game_records, :comment55, :text
    add_column :game_records, :comment56, :text
    add_column :game_records, :comment57, :text
    add_column :game_records, :comment58, :text
    add_column :game_records, :comment59, :text
  end
end
