class BoardsController < ApplicationController
  def show
    @game_record = GameRecord.find(params[:id])
    gon.game_record_id =  @game_record.id
    gon.title = @game_record.title
    gon.black_player = @game_record.black_player
    gon.white_player = @game_record.white_player
    gon.date_played = @game_record.date_played
    gon.place_played = @game_record.place_played
    gon.user_id = @game_record.user_id
    gon.kifu = @game_record.kifu
    gon.from_saved = @game_record.from_saved
    gon.your_move = @game_record.your_move
    gon.vsAI = @game_record.vsAI
    gon.edit_board = @game_record.edit_board
  end

  def index
    @user = User.find(params[:user_id])
  end
end
