class SaveCommentController < ApplicationController
  def update
    game_record_id = params[:game_record_id]
    temp_hand = params[:temp_hand].to_i
    comment = params[:comment]
    @game_record = GameRecord.find(game_record_id)
    case temp_hand
    when 0
      @game_record.comment0 = comment
    when 1
      @game_record.comment1 = comment
    when 2
      @game_record.comment2 = comment
    when 3
      @game_record.comment3 = comment
    when 4
      @game_record.comment4 = comment
    when 5
      @game_record.comment5 = comment
    when 6
      @game_record.comment6 = comment
    when 7
      @game_record.comment7 = comment
    when 8
      @game_record.comment8 = comment
    when 9
      @game_record.comment9 = comment
    when 10
      @game_record.comment10 = comment
    when 11
      @game_record.comment11 = comment
    when 12
      @game_record.comment12 = comment
    when 13
      @game_record.comment13 = comment
    when 14
      @game_record.comment14 = comment
    when 15
      @game_record.comment15 = comment
    when 16
      @game_record.comment16 = comment
    when 17
      @game_record.comment17 = comment
    when 18
      @game_record.comment18 = comment
    when 19
      @game_record.comment19 = comment
    when 20
      @game_record.comment20 = comment
    when 21
      @game_record.comment21 = comment
    when 22
      @game_record.comment22 = comment
    when 23
      @game_record.comment23 = comment
    when 24
      @game_record.comment24 = comment
    when 25
      @game_record.comment25 = comment
    when 26
      @game_record.comment26 = comment
    when 27
      @game_record.comment27 = comment
    when 28
      @game_record.comment28 = comment
    when 29
      @game_record.comment29 = comment
    when 30
      @game_record.comment30 = comment
    when 31
      @game_record.comment31 = comment
    when 32
      @game_record.comment32 = comment
    when 33
      @game_record.comment33 = comment
    when 34
      @game_record.comment34 = comment
    when 35
      @game_record.comment35 = comment
    when 36
      @game_record.comment36 = comment
    when 37
      @game_record.comment37 = comment
    when 38
      @game_record.comment38 = comment
    when 39
      @game_record.comment39 = comment
    when 40
      @game_record.comment40 = comment
    when 41
      @game_record.comment41 = comment
    when 42
      @game_record.comment42 = comment
    when 43
      @game_record.comment43 = comment
    when 44
      @game_record.comment44 = comment
    when 45
      @game_record.comment45 = comment
    when 46
      @game_record.comment46 = comment
    when 47
      @game_record.comment47 = comment
    when 48
      @game_record.comment48 = comment
    when 49
      @game_record.comment49 = comment
    when 50
      @game_record.comment50 = comment
    when 51
      @game_record.comment51 = comment
    when 52
      @game_record.comment52 = comment
    when 53
      @game_record.comment53 = comment
    when 54
      @game_record.comment54 = comment
    when 55
      @game_record.comment55 = comment
    when 56
      @game_record.comment56 = comment
    when 57
      @game_record.comment57 = comment
    when 58
      @game_record.comment58 = comment
    when 59
      @game_record.comment59 = comment
    when 60
      @game_record.comment60 = comment
    when 61
      @game_record.comment61 = comment
    when 62
      @game_record.comment62 = comment
    when 63
      @game_record.comment63 = comment
    when 64
      @game_record.comment64 = comment
    end
    @game_record.save
  end
end
