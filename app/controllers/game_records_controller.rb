class GameRecordsController < ApplicationController
  before_action :set_game_record, only: [:edit, :update, :destroy, :board_search_destroy, :category_search_destroy, :various_search_destroy]
  before_action :set_user_id, only: [:index, :edit, :update, :destroy, :board_search_destroy, :category_search_destroy, :various_search_destroy]
  before_action :logged_in_user, only: [:index, :edit, :update, :destroy, :board_search_destroy, :category_search_destroy, :various_search_destroy, :show]
  before_action :admin_user_or_correct_user, only: [:index, :edit, :update, :destroy, :board_search_destroy, :category_search_destroy, :various_search_destroy, :show]

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
      redirect_to user_game_records_path(@game_record.user_id)
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

  def board_search_destroy
    @game_record.destroy
    flash[:success] = "「#{@game_record.title}」のデータを削除しました。"
    redirect_to board_search_user_game_records_path(@game_record.user_id)
  end

  def various_search_destroy
    @game_record.destroy
    flash[:success] = "「#{@game_record.title}」のデータを削除しました。"
    redirect_to user_game_records_path(current_user.id)
  end

  def category_search_destroy
    @game_record.destroy
    flash[:success] = "「#{@game_record.title}」のデータを削除しました。"
    redirect_to category_search_user_game_records_path(@game_record.user_id)
  end

  def board_search
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

  def various_search
    @game_record = GameRecord.new(game_records_params)
    user_id = params[:user_id]
    title = @game_record.title
    black_player = @game_record.black_player
    white_player = @game_record.white_player
    date_played = @game_record.date_played
    place_played = @game_record.place_played
    kifu = @game_record.kifu
    kifu = kifu.downcase

    if kifu == ""

      if title == "" && black_player != "" && white_player != "" && !date_played.nil? &&  place_played != ""
        @game_records = GameRecord.various_search_without_title_kifu(user_id, black_player, white_player, date_played, place_played)
      elsif title != "" && black_player == "" && white_player != "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_kifu(user_id, title, white_player, date_played, place_played)
      elsif title != "" && black_player != "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_white_player_kifu(user_id, title, black_player, date_played, place_played)
      elsif title != "" && black_player != "" && white_player != "" && date_played.nil?  && place_played != ""
        @game_records = GameRecord.various_search_without_date_played_kifu(user_id, title, black_player, white_player, place_played)
      elsif title != "" && black_player != "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_place_played_kifu(user_id, title, black_player, white_player, date_played)
      elsif title == "" && black_player == "" && white_player != "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_kifu(user_id, white_player, date_played ,place_played)
      elsif title == "" && black_player != "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_white_player_kifu(user_id, black_player, date_played ,place_played)
      elsif title == "" && black_player != "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_date_played_kifu(user_id, black_player, white_player, place_played)
      elsif title == "" && black_player != "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_place_played_kifu(user_id, black_player, white_player, date_played)
      elsif title != "" && black_player == "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_white_player_kifu(user_id, title, date_played, place_played)
      elsif title != "" && black_player == "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_date_played_kifu(user_id, title, white_player, place_played)
      elsif title != "" && black_player == "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_place_played_kifu(user_id, title, white_player, date_played)
      elsif title != "" && black_player != "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_white_player_date_played_kifu(user_id, title, black_player, place_played)
      elsif title != "" && black_player != "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_white_player_place_played_kifu(user_id, title, black_player, date_played)
      elsif title != "" && black_player != "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_date_played_place_played_kifu(user_id, title, black_player, white_player)
      elsif title == "" && black_player == "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_kifu(user_id, date_played, place_played)
      elsif title == "" && black_player == "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_date_played_kifu(user_id, white_player, place_played)
      elsif title == "" && black_player == "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_place_played_kifu(user_id, white_player, date_played)
      elsif title == "" && black_player != "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_white_player_date_played_kifu(user_id, black_player, place_played)
      elsif title == "" && black_player != "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_white_player_place_played_kifu(user_id, black_player, date_played)
      elsif title == "" && black_player != "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_date_played_place_played_kifu(user_id, black_player, white_player)
      elsif title != "" && black_player == "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_white_player_date_played_kifu(user_id, title, place_played)
      elsif title != "" && black_player == "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_white_player_place_played_kifu(user_id, title, date_played)
      elsif title != "" && black_player != "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_white_player_date_played_place_played_kifu(user_id, title, black_player)
      elsif title == "" && black_player == "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_date_played_kifu(user_id, place_played)
      elsif title == "" && black_player == "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_place_played_kifu(user_id, date_played)
      elsif title == "" && black_player == "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_date_played_place_played_kifu(user_id, white_player)
      elsif title == "" && black_player != "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_white_player_date_played_place_played_kifu(user_id, black_player)
      elsif title != "" && black_player == "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_white_player_date_played_place_played_kifu(user_id, title)
      elsif title == "" && black_player == "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_date_played_place_played_kifu(user_id)
      else
        @game_records = GameRecord.various_search_kifu(user_id, title, black_player, white_player, date_played, place_played)
      end
    
    elsif kifu != ""
      if title == "" && black_player != "" && white_player != "" && !date_played.nil? &&  place_played != ""
        @game_records = GameRecord.various_search_without_title(user_id, black_player, white_player, date_played, place_played, kifu)
      elsif title != "" && black_player == "" && white_player != "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player(user_id, title, white_player, date_played, place_played, kifu)
      elsif title != "" && black_player != "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_white_player(user_id, title, black_player, date_played, place_played, kifu)
      elsif title != "" && black_player != "" && white_player != "" && date_played.nil?  && place_played != ""
        @game_records = GameRecord.various_search_without_date_played(user_id, title, black_player, white_player, place_played, kifu)
      elsif title != "" && black_player != "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_place_played(user_id, title, black_player, white_player, date_played, kifu)
      elsif title == "" && black_player == "" && white_player != "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player(user_id, white_player, date_played ,place_played, kifu)
      elsif title == "" && black_player != "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_white_player(user_id, black_player, date_played ,place_played, kifu)
      elsif title == "" && black_player != "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_date_played(user_id, black_player, white_player, place_played, kifu)
      elsif title == "" && black_player != "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_place_played(user_id, black_player, white_player, date_played, kifu)
      elsif title != "" && black_player == "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_white_player(user_id, title, date_played, place_played, kifu)
      elsif title != "" && black_player == "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_date_played(user_id, title, white_player, place_played, kifu)
      elsif title != "" && black_player == "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_place_played(user_id, title, white_player, date_played, kifu)
      elsif title != "" && black_player != "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_white_player_date_played(user_id, title, black_player, place_played, kifu)
      elsif title != "" && black_player != "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_white_player_place_played(user_id, title, black_player, date_played, kifu)
      elsif title != "" && black_player != "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_date_played_place_played(user_id, title, black_player, white_player, kifu)
      elsif title == "" && black_player == "" && white_player == "" && !date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player(user_id, date_played, place_played, kifu)
      elsif title == "" && black_player == "" && white_player != "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_date_played(user_id, white_player, place_played, kifu)
      elsif title == "" && black_player == "" && white_player != "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_place_played(user_id, white_player, date_played, kifu)
      elsif title == "" && black_player != "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_white_player_date_played(user_id, black_player, place_played, kifu)
      elsif title == "" && black_player != "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_white_player_place_played(user_id, black_player, date_played, kifu)
      elsif title == "" && black_player != "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_date_played_place_played(user_id, black_player, white_player, kifu)
      elsif title != "" && black_player == "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_black_player_white_player_date_played(user_id, title, place_played, kifu)
      elsif title != "" && black_player == "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_white_player_place_played(user_id, title, date_played, kifu)
      elsif title != "" && black_player != "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_white_player_date_played_place_played(user_id, title, black_player, kifu)
      elsif title == "" && black_player == "" && white_player == "" && date_played.nil? && place_played != ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_date_played(user_id, place_played, kifu)
      elsif title == "" && black_player == "" && white_player == "" && !date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_place_played(user_id, date_played, kifu)
      elsif title == "" && black_player == "" && white_player != "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_date_played_place_played(user_id, white_player, kifu)
      elsif title == "" && black_player != "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_white_player_date_played_place_played(user_id, black_player, kifu)
      elsif title != "" && black_player == "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_black_player_white_player_date_played_place_played(user_id, title, kifu)
      elsif title == "" && black_player == "" && white_player == "" && date_played.nil? && place_played == ""
        @game_records = GameRecord.various_search_without_title_black_player_white_player_date_played_place_played(user_id, kifu)
      else
        @game_records = GameRecord.various_search(user_id, title, black_player, white_player, date_played, place_played, kifu)
      end

    end
  end

  def show

  end

  private

    def game_records_params
      params.require(:game_record).permit(:title, :black_player, :white_player, :date_played, :place_played, :kifu)
    end

end
