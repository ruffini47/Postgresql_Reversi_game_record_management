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

    @game_records = GameRecord.various_search(user_id, title, black_player, white_player, date_played, place_played, kifu)
  end

  private 

      def game_records_params
      params.require(:game_record).permit(:title, :black_player, :white_player, :date_played, :place_played, :kifu)
    end
end
