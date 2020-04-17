class BoardsController < ApplicationController
  def show
    @record = Record.find(params[:id])
    gon.record_id =  @record.id
  end

  def index
    @user = User.find(params[:user_id])
  end
end
