module StaticPagesHelper
  def searched?
    game_record = GameRecord.find_by(searched: true)
    game_record.present? 
  end
end
