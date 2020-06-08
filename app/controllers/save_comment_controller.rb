class SaveCommentController < ApplicationController
  def update
    game_record_id = params[:game_record_id]
    temp_hand = params[:temp_hand]
    comment = params[:comment]
    @game_record = GameRecord.find(game_record_id)
    //実装ではcase文を使う
    if temp_hand == 0
      @game_record.comment0 = comment
    elsif temp_hand == 1
      @game_record.comment1 = comment
    elsif temp_hand == 2
      @game_record.comment2 = comment
    end
  end
end
