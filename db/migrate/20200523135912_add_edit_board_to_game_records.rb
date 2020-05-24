class AddEditBoardToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :edit_board, :boolean, default: false
  end
end
