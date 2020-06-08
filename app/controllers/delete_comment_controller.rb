class DeleteCommentController < ApplicationController
  def update
    game_record_id = params[:game_record_id]
    temp_hand = params[:temp_hand].to_i
    @game_record = GameRecord.find(game_record_id)
    case temp_hand
    when 0
      @game_record.comment0 = nil
    when 1
      @game_record.comment1 = nil
    when 2
      @game_record.comment2 = nil
    when 3
      @game_record.comment3 = nil
    when 4
      @game_record.comment4 = nil
    when 5
      @game_record.comment5 = nil
    when 6
      @game_record.comment6 = nil 
    when 7
      @game_record.comment7 = nil 
    when 8
      @game_record.comment8 = nil 
    when 9
      @game_record.comment9 = nil 
    when 10
      @game_record.comment10 = nil 
    when 11
      @game_record.comment11 = nil 
    when 12
      @game_record.comment12 = nil
    when 13
      @game_record.comment13 = nil
    when 14
      @game_record.comment14 = nil
    when 15
      @game_record.comment15 = nil
    when 16
      @game_record.comment16 = nil
    when 17
      @game_record.comment17 = nil
    when 18
      @game_record.comment18 = nil
    when 19
      @game_record.comment19 = nil
    when 20
      @game_record.comment20 = nil
    when 21
      @game_record.comment21 = nil
    when 22
      @game_record.comment22 = nil
    when 23
      @game_record.comment23 = nil
    when 24
      @game_record.comment24 = nil
    when 25
      @game_record.comment25 = nil
    when 26
      @game_record.comment26 = nil
    when 27
      @game_record.comment27 = nil
    when 28
      @game_record.comment28 = nil
    when 29
      @game_record.comment29 = nil
    when 30
      @game_record.comment30 = nil
    when 31
      @game_record.comment31 = nil
    when 32
      @game_record.comment32 = nil
    when 33
      @game_record.comment33 = nil
    when 34
      @game_record.comment34 = nil
    when 35
      @game_record.comment35 = nil
    when 36
      @game_record.comment36 = nil
    when 37
      @game_record.comment37 = nil
    when 38
      @game_record.comment38 = nil
    when 39
      @game_record.comment39 = nil
    when 40
      @game_record.comment40 = nil
    when 41
      @game_record.comment41 = nil
    when 42
      @game_record.comment42 = nil
    when 43
      @game_record.comment43 = nil
    when 44
      @game_record.comment44 = nil
    when 45
      @game_record.comment45 = nil
    when 46
      @game_record.comment46 = nil
    when 47
      @game_record.comment47 = nil
    when 48
      @game_record.comment48 = nil
    when 49
      @game_record.comment49 = nil
    when 50
      @game_record.comment50 = nil
    when 51
      @game_record.comment51 = nil
    when 52
      @game_record.comment52 = nil
    when 53
      @game_record.comment53 = nil
    when 54
      @game_record.comment54 = nil
    when 55
      @game_record.comment55 = nil
    when 56
      @game_record.comment56 = nil
    when 57
      @game_record.comment57 = nil
    when 58
      @game_record.comment58 = nil
    when 59
      @game_record.comment59 = nil
    when 60
      @game_record.comment60 = nil
    when 61
      @game_record.comment61 = nil
    when 62
      @game_record.comment62 = nil
    when 63
      @game_record.comment63 = nil
    when 64
      @game_record.comment64 = nil
    end
    @game_record.save
  end
end
