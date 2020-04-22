class ChangeRecordsToGameRecords < ActiveRecord::Migration[6.0]
  def change
    rename_table :records, :game_records
  end
end
