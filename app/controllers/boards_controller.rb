class BoardsController < ApplicationController
  def new
    @record = Record.find(params[:id])
    gon.record_id =  @record.id
  end
end
