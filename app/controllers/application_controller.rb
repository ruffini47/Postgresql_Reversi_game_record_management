class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper

  # paramsハッシュからユーザーを取得します。
  def set_game_record
    @game_record = GameRecord.find(params[:id])
  end
  
  def set_parents
    @parents = Category.where(ancestry: nil)
  end

  def set_user_id
    @user = User.find(params[:user_id])
  end





    # beforeフィルター
    
    # paramsハッシュからユーザーを取得します。
    def set_user
      @user = User.find(params[:id])
    end

    # ログイン済みのユーザーか確認します。
    def logged_in_user
      unless logged_in?
	store_location
	flash[:danger] = "ログインしてください。"
	redirect_to login_url
      end
    end

    # アクセスしたユーザーが現在ログインしているユーザーか確認します。
    def  correct_user
      redirect_to(root_url) unless current_user?(@user)
    end

    # システム管理権限所有かどうか判定します。
    def admin_user
      redirect_to root_url unless current_user.admin?
    end

    # システム管理権限所有ユーザかアクセスしたユーザーが現在ログインしているユーザーか確認します。
    def admin_user_or_correct_user
      redirect_to(root_url) unless (current_user?(@user) or current_user.admin?)
    end






end
