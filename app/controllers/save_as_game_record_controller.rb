class SaveAsGameRecordController < ApplicationController

  def update
    your_move = params[:your_move]
    vsAI = params[:vsAI]
    initial_board = params[:initial_board]
    player_color0 = params[:player_color0]
    edit_board = params[:edit_board]
    @game_record = GameRecord.new
    @game_record.title = params[:title]
    @game_record.black_player = params[:black_player]
    @game_record.white_player = params[:white_player]
    @game_record.date_played = params[:date_played]
    @game_record.place_played = params[:place_played]
    @game_record.user_id = params[:user_id]
    @game_record.kifu = params[:kifu]
    @game_record.from_saved = true
    @game_record.your_move = your_move
    @game_record.vsAI = vsAI
    @game_record.edit_board = false
    @game_record.player_color0 = player_color0
    
    @game_record.comment0 = params[:comment0]
    @game_record.comment1 = params[:comment1]
    @game_record.comment2 = params[:comment2]
    @game_record.comment3 = params[:comment3]
    @game_record.comment4 = params[:comment4]
    @game_record.comment5 = params[:comment5]
    @game_record.comment6 = params[:comment6]
    @game_record.comment7 = params[:comment7]
    @game_record.comment8 = params[:comment8]
    @game_record.comment9 = params[:comment9]
    @game_record.comment10 = params[:comment10]
    @game_record.comment11 = params[:comment11]
    @game_record.comment12 = params[:comment12]
    @game_record.comment13 = params[:comment13]
    @game_record.comment14 = params[:comment14]
    @game_record.comment15 = params[:comment15]
    @game_record.comment16 = params[:comment16]
    @game_record.comment17 = params[:comment17]
    @game_record.comment18 = params[:comment18]
    @game_record.comment19 = params[:comment19]
    @game_record.comment20 = params[:comment20]
    @game_record.comment21 = params[:comment21]
    @game_record.comment22 = params[:comment22]
    @game_record.comment23 = params[:comment23]
    @game_record.comment24 = params[:comment24]
    @game_record.comment25 = params[:comment25]
    @game_record.comment26 = params[:comment26]
    @game_record.comment27 = params[:comment27]
    @game_record.comment28 = params[:comment28]
    @game_record.comment29 = params[:comment29]
    @game_record.comment30 = params[:comment30]
    @game_record.comment31 = params[:comment31]
    @game_record.comment32 = params[:comment32]
    @game_record.comment33 = params[:comment33]
    @game_record.comment34 = params[:comment34]
    @game_record.comment35 = params[:comment35]
    @game_record.comment36 = params[:comment36]
    @game_record.comment37 = params[:comment37]
    @game_record.comment38 = params[:comment38]
    @game_record.comment39 = params[:comment39]
    @game_record.comment40 = params[:comment40]
    @game_record.comment41 = params[:comment41]
    @game_record.comment42 = params[:comment42]
    @game_record.comment43 = params[:comment43]
    @game_record.comment44 = params[:comment44]
    @game_record.comment45 = params[:comment45]
    @game_record.comment46 = params[:comment46]
    @game_record.comment47 = params[:comment47]
    @game_record.comment48 = params[:comment48]
    @game_record.comment49 = params[:comment49]
    @game_record.comment50 = params[:comment50]
    @game_record.comment51 = params[:comment51]
    @game_record.comment52 = params[:comment52]
    @game_record.comment53 = params[:comment53]
    @game_record.comment54 = params[:comment54]
    @game_record.comment55 = params[:comment55]
    @game_record.comment56 = params[:comment56]
    @game_record.comment57 = params[:comment57]
    @game_record.comment58 = params[:comment58]
    @game_record.comment59 = params[:comment59]
    @game_record.comment60 = params[:comment60]
    @game_record.comment61 = params[:comment61]
    @game_record.comment62 = params[:comment62]
    @game_record.comment63 = params[:comment63]
    @game_record.comment64 = params[:comment64]
    @game_record.edit_board = edit_board

    if vsAI == "true"
      if your_move == "first"
        @game_record.white_player = "AI プレイヤー"
        if @game_record.black_player == "AI プレイヤー"
          @game_record.black_player = "プレイヤー1"
        end
      elsif your_move == "second"
        @game_record.black_player = "AI プレイヤー"
        if @game_record.white_player == "AI プレイヤー"
          @game_record.white_player = "プレイヤー2"
        end
      end
    elsif vsAI == "false"
      if @game_record.black_player == "AI プレイヤー"
        @game_record.black_player = "プレイヤー1"
      elsif @game_record.white_player == "AI プレイヤー"
        @game_record.white_player = "プレイヤー2"
      end
    end
    
    board0 = ""
    i = []

    8.times do |ii|
      i.push(ii.to_s)
    end

    #i = ["0","1","2","3","4","5","6","7"]

    8.times do |k|
      8.times do |j|
        board0 << initial_board[i[k]][j]
      end
    end
    @game_record.board0 = board0
    @game_record.save        

  end

end
