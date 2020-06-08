class AddComments40ToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :comment40, :text
    add_column :game_records, :comment41, :text
    add_column :game_records, :comment42, :text
    add_column :game_records, :comment43, :text
    add_column :game_records, :comment44, :text
    add_column :game_records, :comment45, :text
    add_column :game_records, :comment46, :text
    add_column :game_records, :comment47, :text
    add_column :game_records, :comment48, :text
    add_column :game_records, :comment49, :text
  end
end
