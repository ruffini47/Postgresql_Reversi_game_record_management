class VsAiGameRecordController < ApplicationController
  before_action :set_user, only: [:edit, :update, :destroy]
  def new
    @game_record = GameRecord.new
    @your_move = params[:your_move]
  end

   def create
    @game_record = GameRecord.new(game_records_params)
    user_id = params[:user_id]
    @game_record.user_id = user_id
    your_move = params[:your_move]
    @game_record.your_move = your_move
    @game_record.vsAI= true
    if @game_record.save
      flash[:success] = "プレイヤー情報を作成しました。ai"
      redirect_to show_board_url(@game_record.id)
    else
      flash[:danger] = "プレイヤー情報の作成に失敗しました。"
      render :new
    end
  end

 private

    def game_records_params
      params.require(:game_record).permit(:title, :black_player, :white_player, :date_played, :place_played)
    end

end
