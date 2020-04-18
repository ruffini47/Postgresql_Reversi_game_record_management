class RecordsController < ApplicationController
  before_action :set_user, only: [:edit, :update, :destroy]
  def new
    @record = Record.new          
  end

  def create
    @record = Record.new(records_params)
    @record.user_id = params[:user_id]
    if @record.save
      flash[:success] = "プレイヤー情報を作成しました。"
      redirect_to show_board_url(@record.id)
    else
      flash[:danger] = "プレイヤー情報の作成に失敗しました。"
      render :new     
    end
  end 

  def index
    @records = Record.all
    @records = @records.where(user_id: current_user.id)
  end

  def edit
  end

  def update
    if @record.update_attributes(records_params)
      flash[:success] = "プレイヤー情報を更新しました。"
      redirect_to user_records_path(current_user.id)
    else
      flash[:danger] = "プレイヤー情報の更新に失敗しました。"
      render :edit      
    end
  end

  def destroy
    @record.destroy
    flash[:success] = "「#{@record.title}」のデータを削除しました。"
    redirect_to user_records_path(current_user.id)
  end



  private

    def records_params
      params.require(:record).permit(:title, :black_player, :white_player, :date_played, :place_played)
    end

end
