class SaveCategorySearchedGameRecordController < ApplicationController
  def update
    id = params[:grand_child_id].to_i
    case id
    when 16
      kifu = "f5d6c5f4e3c6d3f6e6d7g3c4"
    end
    initial_board = ""
    player_color0 = 1;
    #@game_records = GameRecord.where(user_id: current_user.id, board0: initial_borad, player_color0: player_color0).where("kifu LIKE ?", kifu + "%")
  end
end
