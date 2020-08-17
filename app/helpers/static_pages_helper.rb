module StaticPagesHelper
  def searched?
    game_record = GameRecord.where(user_id: current_user.id).find_by(searched: true)
    game_record.present? 
  end
end
