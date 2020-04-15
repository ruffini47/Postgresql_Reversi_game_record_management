class AddKihuRecordToRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :records, :kihu_record, :string
  end
end
