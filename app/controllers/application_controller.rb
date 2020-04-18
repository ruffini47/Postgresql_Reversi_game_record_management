class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper

  # paramsハッシュからユーザーを取得します。
  def set_user
    @record = Record.find(params[:id])
  end
end
