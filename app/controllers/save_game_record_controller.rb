class SaveGameRecordController < ApplicationController
  def update
    kifu = params[:kifu]
    game_record_id = params[:game_record_id]
    @game_record = GameRecord.find(game_record_id)
    @game_record.kifu = kifu
    @game_record.save
  end
end
