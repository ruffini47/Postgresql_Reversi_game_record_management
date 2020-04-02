class BoardsController < ApplicationController
  def new
    @record = Record.find(params[:id])
  end
end
