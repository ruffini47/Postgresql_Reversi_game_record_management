class AddBoard0ToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :board0, :string, default: ""
  end
end
