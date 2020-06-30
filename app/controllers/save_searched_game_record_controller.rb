class SaveSearchedGameRecordController < ApplicationController
  def update
    game_record_id = params[:game_record_id]
    kifu = params[:kifu]
    initial_board = params[:initial_board]
    player_color0 = params[:player_color0]
    searched = params[:searched]
    @game_record = GameRecord.find(game_record_id)
    @game_record.kifu = kifu
    @game_record.from_saved = true
    @game_record.your_move = "first"
    @game_record.vsAI = false
    @game_record.edit_board = false
    @game_record.player_color0 = player_color0
    @game_record.searched = searched
    
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
    @game_record.board0 = board0
    @game_record.save
    render :new
    # なぜ呼び出されないのか？
  end
  def new
  end
end
