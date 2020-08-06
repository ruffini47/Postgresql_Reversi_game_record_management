class TrialsController < ApplicationController
  def create
    @game_record = GameRecord.new
    @game_record.title = "試し打ち"
    @game_record.black_player = "プレイヤー1"
    @game_record.white_player = "プレイヤー2"
    @game_record.date_played = Time.now
    @game_record.place_played = "場所未入力"
    @game_record.kifu = ""
    if logged_in?
      @game_record.user_id = current_user.id
      @game_record.logged_in = true
    else
      @game_record.user_id = 1
      @game_record.logged_in = false
    end
    @game_record.vsAI = false
    @game_record.edit_board = false
    if @game_record.save
      redirect_to show_board_url(@game_record.id)
    else
      flash[:danger] = "プレイヤー情報の作成に失敗しました。"
    end
  end
end
