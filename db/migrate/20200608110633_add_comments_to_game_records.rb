class AddCommentsToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :comment1, :text
    add_column :game_records, :comment2, :text
    add_column :game_records, :comment3, :text
    add_column :game_records, :comment4, :text
    add_column :game_records, :comment5, :text
    add_column :game_records, :comment6, :text
    add_column :game_records, :comment7, :text
    add_column :game_records, :comment8, :text
    add_column :game_records, :comment9, :text
  end
end
