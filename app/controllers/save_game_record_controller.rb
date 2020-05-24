class SaveGameRecordController < ApplicationController
  def update
    game_record_id = params[:game_record_id]
    kifu = params[:kifu]
    your_move = params[:your_move]
    vsAI = params[:vsAI]
    @game_record = GameRecord.find(game_record_id)
    @game_record.kifu = kifu
    @game_record.from_saved = true
    @game_record.your_move = your_move
    @game_record.vsAI = vsAI
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
    @game_record.save
    render :new
    # なぜ呼び出されないのか？
  end
  def new
  end
end
