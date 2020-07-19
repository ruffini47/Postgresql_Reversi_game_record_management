class AddCategorySearchedToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :category_searched, :boolean, default: false
  end
end
