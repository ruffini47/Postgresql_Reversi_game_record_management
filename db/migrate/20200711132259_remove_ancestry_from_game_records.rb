class RemoveAncestryFromGameRecords < ActiveRecord::Migration[6.0]
  def change

    remove_column :game_records, :ancestry, :string
  end
end
