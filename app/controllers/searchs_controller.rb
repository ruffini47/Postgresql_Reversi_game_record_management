class SearchsController < ApplicationController
  def new
    @game_record = GameRecord.new
  end

  def create
    @game_record = GameRecord.new(game_records_params)
    @game_record.user_id = params[:user_id]
    @game_record.vsAI = false
    @game_record.edit_board = false
    @game_record.searched = true
    if @game_record.save
      #flash[:success] = "プレイヤー情報を作成しました。"
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
