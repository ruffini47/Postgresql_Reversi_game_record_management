class AddFromSavedYourMoveToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :from_saved, :boolean, default: false
    add_column :game_records, :your_move, :string, default: "second"
  end
end
