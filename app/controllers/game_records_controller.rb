class GameRecordsController < ApplicationController
  before_action :set_game_record, only: [:edit, :update, :destroy]
  before_action :set_user_game_record, only:[:index]

  def new
    @game_record = GameRecord.new
  end

  def create
    @game_record = GameRecord.new(game_records_params)
    @game_record.user_id = params[:user_id]
    @game_record.vsAI = false
    @game_record.edit_board = false
    @game_record.logged_in = true
    if @game_record.save
      #flash[:success] = "プレイヤー情報を作成しました。"
      redirect_to show_board_url(@game_record.id)
    else
      flash[:danger] = "プレイヤー情報の作成に失敗しました。"
      render :new     
    end
  end 

  def index
    @game_records = GameRecord.all
    @game_records = @game_records.where(user_id: @user.id).order(id: "ASC") 
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
    redirect_to user_game_records_path(@game_record.user_id)
  end

  def search
    game_records = GameRecord.search(current_user.id)
    game_record = GameRecord.latest_search(current_user.id);
    game_records.each {|game_record2|
      if game_record2.id != game_record.id
        game_record2.destroy
      end
    }
    @game_records = GameRecord.board_search(current_user.id, game_record.board0, game_record.player_color0, game_record.kifu.downcase)
  end

  def category_search
    @game_records = GameRecord.category_search(current_user.id)
  end


  private

    def game_records_params
      params.require(:game_record).permit(:title, :black_player, :white_player, :date_played, :place_played, :kifu)
    end

end
