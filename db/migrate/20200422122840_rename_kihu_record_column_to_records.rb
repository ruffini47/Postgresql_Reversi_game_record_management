class RenameKihuRecordColumnToRecords < ActiveRecord::Migration[6.0]
  def change
    rename_column :records, :kihu_record, :record
  end
end
