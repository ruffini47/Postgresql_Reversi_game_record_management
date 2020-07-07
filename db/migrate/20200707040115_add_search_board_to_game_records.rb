class AddSearchBoardToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :search_board, :boolean, default: false
  end
end
