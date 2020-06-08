class SaveCommentController < ApplicationController
  def update
    game_record_id = params[:game_record_id]
    temp_hand = params[:temp_hand]
    temp_hand = temp_hand.to_i
    comment = params[:comment]
    @game_record = GameRecord.find(game_record_id)
    if temp_hand == 0
      @game_record.comment0 = comment
    end
    @game_record.save
  end
end
