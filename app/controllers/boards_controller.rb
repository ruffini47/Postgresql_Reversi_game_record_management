class BoardsController < ApplicationController
  def show
    @game_record = GameRecord.find(params[:id])
    gon.game_record_id =  @game_record.id
    gon.kifu = @game_record.kifu
    gon.from_saved = @game_record.from_saved
    gon.your_move = @game_record.your_move
    gon.isComputer = params[:isComputer]
  end

  def index
    @user = User.find(params[:user_id])
  end
end
