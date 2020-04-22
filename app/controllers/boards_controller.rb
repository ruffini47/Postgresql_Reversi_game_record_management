class BoardsController < ApplicationController
  def show
    @record = Record.find(params[:id])
    gon.record_id =  @record.id
    gon.record = @record.record
    gon.from_saved = params[:from_saved]
  end

  def index
    @user = User.find(params[:user_id])
  end
end
