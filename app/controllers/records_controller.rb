class RecordsController < ApplicationController
  def new
    @record = Record.new          
  end

  def create
    @record = Record.new(records_params)
    @record.user_id = params[:user_id]
    if @record.save
      flash[:success] = "プレイヤー情報を更新しました。"
      redirect_to new_board_url(@record.id)
    else
      flash[:danger] = "プレイヤー情報の更新に失敗しました。"
      render :new     
    end
  end 

  def index
    @records = Record.all
    @records = @records.where(user_id: current_user.id)
  end

  private

    def records_params
      params.require(:record).permit(:title, :black_player, :white_player, :date_played, :place_played)
    end

end
