class GameRecordsController < ApplicationController
  before_action :set_game_record, only: [:edit, :update, :destroy]
  def new
    @game_record = GameRecord.new
  end

  def create
    @game_record = GameRecord.new(game_records_params)
    @game_record.user_id = params[:user_id]
    if @game_record.save
      flash[:success] = "プレイヤー情報を作成しました。"
      redirect_to show_board_url(@game_record.id, "false")
    else
      flash[:danger] = "プレイヤー情報の作成に失敗しました。"
      render :new     
    end
  end 

  def index
    @game_records = GameRecord.all
    @game_records = @game_records.where(user_id: current_user.id)
  end

  def edit
  end

  def update
    if @game_record.update_attributes(game_records_params)
      flash[:success] = "プレイヤー情報を更新しました。"
      redirect_to user_game_records_path(current_user.id)
    else
      flash[:danger] = "プレイヤー情報の更新に失敗しました。"
      render :edit      
    end
  end

  def destroy
    @game_record.destroy
    flash[:success] = "「#{@game_record.title}」のデータを削除しました。"
    redirect_to user_game_records_path(current_user.id)
  end

  private

    def game_records_params
      params.require(:game_record).permit(:title, :black_player, :white_player, :date_played, :place_played)
    end

end
