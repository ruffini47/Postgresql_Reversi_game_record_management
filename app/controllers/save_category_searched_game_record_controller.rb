class SaveCategorySearchedGameRecordController < ApplicationController
  def update
    id = params[:id].to_i
    player_color0 = 1
    case id
    when 1
      kifu = "f5d6c4d3c5"
    when 2
      kifu = "f5f6e6f4"
    when 3
      kifu = "f5d6c3"
    when 4
      kifu = "f5d6c5f4e3"
    when 5
      kifu = "f5d6c4d3c5"
    when 6
      kifu = "F5f4E3f6D3"
    when 7
      kifu = "F5f6E6f4E3"
    when 8
      kifu = "F5f6E6f4G5"
    when 16
      kifu = "F5f4E3f6D3e2F2c5F1c4E6f3C3d7"
    when 17
      kifu = "f5f4e3f6d3c5d6c4e6c7d7c6g5g3f3d2c2e7"
    when 18
      kifu = "f5f4e3f2e2f6d3c4f3e1f1g1e6c5c6d6"
    when 19
      kifu = "f5f6e6f4e3c5"
    when 20
      kifu = "f5f6e6f4e3c5c4e7c6e2f3f2"
    when 21
      kifu = "f5f6e6f4e3c5c4e7c6e2f3f2g5g4g6d6h3h5g3c3d3b3b4"
    when 22
      kifu = "f5f6e6f4g5"
    when 23
      kifu = "f5f6e6f4g5e7f7h5"
    when 24
      kifu = "f5f6e6f4c3"
    when 25
      kifu = "f5f6e6f4c3d7"
    when 26
      kifu = "f5f6e6f4g6"
    when 27
      kifu = "f5f6e6f4g6c5f3"
    when 28
      kifu = "f5d6c3d3c4f4c5b3c2"
    when 29
      kifu = "f5d6c3d3c4f4c5b3c2e3d2c6b4a3g3g4f3c1b5a4a6d1e2f2"
    when 30
      kifu = "f5d6c3d3c4f4f6f3e6e7d7"
    when 31
      kifu = "f5d6c3d3c4f4f6g5"
    when 32
      kifu = "f5d6c5f4e3c6d3f6e6d7g3c4"
    when 33
      kifu = "f5d6c5f4e3c6d3f6e6d7g3c4b4b3b5a4a2a3a5"
    when 34
      kifu = "f5d6c5f4e3c6d3f6e6d7g4c4"
    when 35
      kifu = "f5d6c5f4e3c6d3f6e6d7g4c4g5c3f7d2e7f2c8f3c7d8e8g3e2h4f1"
    when 36
      kifu = "f5d6c5f4e3c6d3f6e6d7g4c4g5c3f7d2e7f2e2f3c8g3f1f8"
    when 37
      kifu = "f5d6c5f4e3c6d3f6e6d7e7c7c4f3d8"
    when 38
      kifu = "f5d6c5f4e3c6d3f6e6d7e7c7c4f3d8c8b8e2b6e8f8f7g4"
    else
      kifu =""
    end
    
    board0 ="0000000000000000000000000002100000012000000000000000000000000000"

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
