class AddComments20ToGameRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :game_records, :comment20, :text
    add_column :game_records, :comment21, :text
    add_column :game_records, :comment22, :text
    add_column :game_records, :comment23, :text
    add_column :game_records, :comment24, :text
    add_column :game_records, :comment25, :text
    add_column :game_records, :comment26, :text
    add_column :game_records, :comment27, :text
    add_column :game_records, :comment28, :text
    add_column :game_records, :comment29, :text
  end
end
