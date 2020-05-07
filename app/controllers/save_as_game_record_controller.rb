class SaveAsGameRecordController < ApplicationController

  def update

    @game_record = GameRecord.new
    @game_record.title = params[:title]
    @game_record.black_player = params[:black_player]
    @game_record.white_player = params[:white_player]
    @game_record.date_played = params[:date_played]
    @game_record.place_played = params[:place_played]
    @game_record.user_id = params[:user_id]
    @game_record.kifu = params[:kifu]
    @game_record.from_saved = true
    @game_record.your_move = params[:your_move]
    @game_record.vsAI = params[:vsAI]
    @game_record.save        

  end

end
