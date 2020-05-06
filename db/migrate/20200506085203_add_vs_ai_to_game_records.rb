class AddVsAiToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :vsAI, :boolean, default: false
  end
end
