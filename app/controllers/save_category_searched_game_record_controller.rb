class SaveCategorySearchedGameRecordController < ApplicationController
  def update
    id = params[:grand_child_id].to_i
    initial_board = params[:initial_board]
    player_color0 = 1
    case id
    when 16
      kifu = "F5f4E3f6D3e2F2c5F1c4E6f3C3d7"
    when 17
      kifu = "f5f4e3f6d3c5d6c4e6c7d7c6g5g3f3d2c2e7"
    end
    board0 = ""
    i = []

    8.times do |ii|
      i.push(ii.to_s)
    end

    #i = ["0","1","2","3","4","5","6","7"]

    8.times do |k|
      8.times do |j|
        board0 << initial_board[i[k]][j]
      end
    end

    past_game_records = GameRecord.where(user_id: current_user.id, category_searched: true);
    past_game_records.each do |past_game_record|
      past_game_record.category_searched = false;
      past_game_record.save
    end
    
    @game_records = GameRecord.where(user_id: current_user.id, board0: board0, player_color0: player_color0).where("kifu LIKE ?", kifu + "%")
    @game_records.each do |game_record|
      game_record.category_searched = true
      game_record.save
    end
  end
end
