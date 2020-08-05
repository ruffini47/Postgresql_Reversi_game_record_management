class VariousSearchesController < ApplicationController
  def new
    @game_record = GameRecord.new
  end

  def create
    @game_record = GameRecord.new(game_records_params)
    user_id = params[:user_id]
    title = @game_record.title
    black_player = @game_record.black_player
    white_player = @game_record.white_player
    date_played = @game_record.date_played
    place_played = @game_record.place_played
    kifu = @game_record.kifu
    kifu = kifu.downcase

    if kifu == ""

      if title == "" && black_player != "" && white_player != "" && !date_played.nil? &&  place_played != ""
        @game_records = GameRecord.various_search_without_title_kifu(user_id, black_player, white_player, date_played, place_played)
      elsif title != "" && black_player == "" && white_player != "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_kifu(user_id, title, white_player, date_played, place_played)
      elsif title != "" && black_player != "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_white_player_kifu(user_id, title, black_player, date_played, place_played)
      elsif title != "" && black_player != "" && white_player != "" && date_played.nil?  && place_played != ""
        @game_records = GameRecord.various_search_without_date_played_kifu(user_id, title, black_player, white_player, place_played)
      elsif title != "" && black_player != "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_place_played_kifu(user_id, title, black_player, white_player, date_played)
      elsif title == "" && black_player == "" && white_player != "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_kifu(user_id, white_player, date_played ,place_played)
      elsif title == "" && black_player != "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_white_player_kifu(user_id, black_player, date_played ,place_played)
      elsif title == "" && black_player != "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_date_played_kifu(user_id, black_player, white_player, place_played)
      elsif title == "" && black_player != "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_place_played_kifu(user_id, black_player, white_player, date_played)
      elsif title != "" && black_player == "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_white_player_kifu(user_id, title, date_played, place_played)
      elsif title != "" && black_player == "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_date_played_kifu(user_id, title, white_player, place_played)
      elsif title != "" && black_player == "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_place_played_kifu(user_id, title, white_player, date_played)
      elsif title != "" && black_player != "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_white_player_date_played_kifu(user_id, title, black_player, place_played)
      elsif title != "" && black_player != "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_white_player_place_played_kifu(user_id, title, black_player, date_played)
      elsif title != "" && black_player != "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_date_played_place_played_kifu(user_id, title, black_player, white_player)
      elsif title == "" && black_player == "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_kifu(user_id, date_played, place_played)
      elsif title == "" && black_player == "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_date_played_kifu(user_id, white_player, place_played)
      elsif title == "" && black_player == "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_place_played_kifu(user_id, white_player, date_played)
      elsif title == "" && black_player != "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_white_player_date_played_kifu(user_id, black_player, place_played)
      elsif title == "" && black_player != "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_white_player_place_played_kifu(user_id, black_player, date_played)
      elsif title == "" && black_player != "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_date_played_place_played_kifu(user_id, black_player, white_player)
      elsif title != "" && black_player == "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_white_player_date_played_kifu(user_id, title, place_played)
      elsif title != "" && black_player == "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_white_player_place_played_kifu(user_id, title, date_played)
      elsif title != "" && black_player != "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_white_player_date_played_place_played_kifu(user_id, title, black_player)
      elsif title == "" && black_player == "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_date_played_kifu(user_id, place_played)
      elsif title == "" && black_player == "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_place_played_kifu(user_id, date_played)
      elsif title == "" && black_player == "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_date_played_place_played_kifu(user_id, white_player)
      elsif title == "" && black_player != "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_white_player_date_played_place_played_kifu(user_id, black_player)
      elsif title != "" && black_player == "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_white_player_date_played_place_played_kifu(user_id, title) 
      else	    
        @game_records = GameRecord.various_search_kifu(user_id, title, black_player, white_player, date_played, place_played)
      end

    elsif kifu != ""
      if title == "" && black_player != "" && white_player != "" && !date_played.nil? &&  place_played != ""
        @game_records = GameRecord.various_search_without_title(user_id, black_player, white_player, date_played, place_played, kifu)
      elsif title != "" && black_player == "" && white_player != "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player(user_id, title, white_player, date_played, place_played, kifu)
      elsif title != "" && black_player != "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_white_player(user_id, title, black_player, date_played, place_played, kifu)
      elsif title != "" && black_player != "" && white_player != "" && date_played.nil?  && place_played != ""
        @game_records = GameRecord.various_search_without_date_played(user_id, title, black_player, white_player, place_played, kifu)
      elsif title != "" && black_player != "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_place_played(user_id, title, black_player, white_player, date_played, kifu)
      elsif title == "" && black_player == "" && white_player != "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player(user_id, white_player, date_played ,place_played, kifu)
      elsif title == "" && black_player != "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_white_player(user_id, black_player, date_played ,place_played, kifu)
      elsif title == "" && black_player != "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_date_played(user_id, black_player, white_player, place_played, kifu)
      elsif title == "" && black_player != "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_place_played(user_id, black_player, white_player, date_played, kifu)
      elsif title != "" && black_player == "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_white_player(user_id, title, date_played, place_played, kifu)
      elsif title != "" && black_player == "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_date_played(user_id, title, white_player, place_played, kifu)
      elsif title != "" && black_player == "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_place_played(user_id, title, white_player, date_played, kifu)
      elsif title != "" && black_player != "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_white_player_date_played(user_id, title, black_player, place_played, kifu)
      elsif title != "" && black_player != "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_white_player_place_played(user_id, title, black_player, date_played, kifu)
      elsif title != "" && black_player != "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_date_played_place_played(user_id, title, black_player, white_player, kifu)
      elsif title == "" && black_player == "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player(user_id, date_played, place_played, kifu)
      elsif title == "" && black_player == "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_date_played(user_id, white_player, place_played, kifu)
      elsif title == "" && black_player == "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_place_played(user_id, white_player, date_played, kifu)
      elsif title == "" && black_player != "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_white_player_date_played(user_id, black_player, place_played, kifu)
      elsif title == "" && black_player != "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_white_player_place_played(user_id, black_player, date_played, kifu)
      elsif title == "" && black_player != "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_date_played_place_played(user_id, black_player, white_player, kifu)
      elsif title != "" && black_player == "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_white_player_date_played(user_id, title, place_played, kifu)
      elsif title != "" && black_player == "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_white_player_place_played(user_id, title, date_played, kifu)
      elsif title != "" && black_player != "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_white_player_date_played_place_played(user_id, title, black_player, kifu)
      elsif title == "" && black_player == "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_date_played(user_id, place_played, kifu)
      elsif title == "" && black_player == "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_place_played(user_id, date_played, kifu)
      elsif title == "" && black_player == "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_date_played_place_played(user_id, white_player, kifu)
      elsif title == "" && black_player != "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_white_player_date_played_place_played(user_id, black_player, kifu)
      elsif title != "" && black_player == "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_white_player_date_played_place_played(user_id, title, kifu) 
      else	    
        @game_records = GameRecord.various_search(user_id, title, black_player, white_player, date_played, place_played, kifu)
      end
   
    end

  end

  private 

      def game_records_params
      params.require(:game_record).permit(:title, :black_player, :white_player, :date_played, :place_played, :kifu)
    end
end
