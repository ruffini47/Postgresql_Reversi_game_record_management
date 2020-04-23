class BoardsController < ApplicationController
  def show
    @game_record = GameRecord.find(params[:id])
    gon.game_record_id =  @game_record.id
    gon.kifu = @game_record.kifu
    gon.from_saved = params[:from_saved]
  end

  def index
    @user = User.find(params[:user_id])
  end
end
