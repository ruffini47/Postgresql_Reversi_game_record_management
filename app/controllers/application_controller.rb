class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper

  # paramsハッシュからユーザーを取得します。
  def set_user
    @user = User.find(params[:id])
  end

  # paramsハッシュからユーザーを取得します。
  def set_game_record
    @game_record = GameRecord.find(params[:id])
  end

end
