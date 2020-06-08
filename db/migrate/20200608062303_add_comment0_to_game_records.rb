class AddComment0ToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :comment0, :text
  end
end
