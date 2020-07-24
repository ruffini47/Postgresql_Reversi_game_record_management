class VariousSearchesController < ApplicationController
  def new
    @game_record = GameRecord.new
  end
end
