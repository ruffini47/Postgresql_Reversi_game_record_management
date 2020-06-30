class AddSearchedToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :searched, :boolean, default: false
  end
end
