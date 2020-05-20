class SaveAsGameRecordController < ApplicationController

  def update
    your_move = params[:your_move]
    vsAI = params[:vsAI]
    @game_record = GameRecord.new
    @game_record.title = params[:title]
    @game_record.black_player = params[:black_player]
    @game_record.white_player = params[:white_player]
    @game_record.date_played = params[:date_played]
    @game_record.place_played = params[:place_played]
    @game_record.user_id = params[:user_id]
    @game_record.kifu = params[:kifu]
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

  end

end
