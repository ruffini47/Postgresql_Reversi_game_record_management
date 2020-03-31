class AddUserToRecords < ActiveRecord::Migration[6.0]
  def change
    add_reference :records, :user, null: false, foreign_key: true
  end
end
