class RenameRecordColumnToGameRecords < ActiveRecord::Migration[6.0]
  def change
    rename_column :game_records, :record, :kifu
  end
end
