class AddAncestryToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :ancestry, :string
    add_index :game_records, :ancestry
  end
end
