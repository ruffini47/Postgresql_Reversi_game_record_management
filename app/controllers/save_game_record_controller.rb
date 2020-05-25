class SaveGameRecordController < ApplicationController
  def update
    game_record_id = params[:game_record_id]
    kifu = params[:kifu]
    your_move = params[:your_move]
    vsAI = params[:vsAI]
    initial_board = params[:initial_board]
    player_color0 = params[:player_color0]
    @game_record = GameRecord.find(game_record_id)
    @game_record.kifu = kifu
    @game_record.from_saved = true
    @game_record.your_move = your_move
    @game_record.vsAI = vsAI
    @game_record.edit_board = false
    @game_record.player_color0 = player_color0
    if vsAI == "true"
      if your_move == "first"
	@game_record.white_player = "AI プレイヤー"
	if @game_record.black_player == "AI プレイヤー"
	  @game_record.black_player = "プレイヤー1"
	end
      elsif your_move == "second"
        @game_record.black_player = "AI プレイヤー"
	if @game_record.white_player == "AI プレイヤー"
	  @game_record.white_player = "プレイヤー2"
	end
      end
    elsif vsAI == "false"
      if @game_record.black_player == "AI プレイヤー"
        @game_record.black_player = "プレイヤー1"
      elsif @game_record.white_player == "AI プレイヤー"
	@game_record.white_player = "プレイヤー2"
      end
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
    @game_record.board0 = board0
    @game_record.save
    render :new
    # なぜ呼び出されないのか？
  end
  def new
  end
end
