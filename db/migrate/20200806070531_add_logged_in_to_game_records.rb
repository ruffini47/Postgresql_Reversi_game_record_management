class AddLoggedInToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :logged_in, :boolean, default: true
  end
end
