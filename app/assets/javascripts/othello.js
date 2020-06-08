(function() {
  // 変数定義
  var BOARD_SIZE = {
    'WIDTH' :8,
    'HEIGHT' :8,
  };

  var BLOCK_KIND = {
    'NONE' : 0,
    'BLACK' : 1,
    'WHITE' : 2,
    'MAX' : 3,
  };

  var FRAME_WIDTH = 12;
  var CELL_WIDTH = 41;
  var YELLOW_WIDTH = 0;

  var SLEEP_KIND = {
    'TURNOVER' : 1000,
  };

  var isFirst = false;
  var isFinished = false;

  var from_saved = false;
  var your_move = "first";
  var vsAI = false;
  var edit_board = false;
  var board0 = "";
  var edit_flag = false;
  
  var stone;
  var board = [];
  var player_color;
  var player_color_array = [];
  var choiced_stone_color = BLOCK_KIND.BLACK;
  var player_color0 = 1;

  var black_next_yellow_frame_length = 0;
  var white_next_yellow_frame_length = 0;
  var black_select_yellow_frame_length = 0;
  var white_select_yellow_frame_length = 0;
  var none_select_yellow_frame_length = 0;

  var saved_board = [];
  var saved_vsAI;
  var saved_isFirst;
  var saved_your_move;
  var saved_from_saved;
  var saved_last_hand;
  var saved_temp_hand;
  var saved_previous_temp_hand;
  var saved_wrap_flag;
  var saved_beginning_flag;
  var saved_end_flag;
  var saved_link_flag;
  var saved_from_saved_first_flag;
  var saved_for_jump_temp_hand;
 


  var kifu = "";
  var display_kifu = [];
  var alphabet ="abcdefgh";
  var Alphabet ="ABCDEFGH";

  var last_hand;
  var temp_hand;
  var previous_temp_hand;
  var for_jump_temp_hand;
  var wrap_flag;
  var beginning_flag;
  var end_flag;
  var link_flag;
  var from_saved_first_flag;
  var cancel_flag;

  var game_record_id;
  var comment = [];

  var getCountIsPossibleToTurnOver = function(i, x, y, dx, dy) {

    var count = 0;
    var cx = x + dx;
    var cy = y + dy;

    if (( cx < 0 || BOARD_SIZE.WIDTH < cx) ||
      ( cy < 0 || BOARD_SIZE.HEIGHT < cy)) {

      return 0;
    }

    while(board[i][cx][cy] == BLOCK_KIND.MAX - player_color) {
      count++;
      cx += dx;
      cy += dy;

      if (( cx < 0 || BOARD_SIZE.WIDTH < cx) ||
        ( cy < 0 || BOARD_SIZE.HEIGHT < cy)) {

        return 0;
      }
    }

    if (count > 0 && board[i][cx][cy] == player_color) {
      return count;
    }

    return 0;
  };

  var turnOverStraight = function(i, x, y, dx, dy) {

    var cx = x + dx;
    var cy = y + dy;

    while(board[i][cx][cy] == BLOCK_KIND.MAX - player_color) {
      board[i][cx][cy] = player_color;
      cx += dx;
      cy += dy;
    }
  };

  var turnOverBlock = function(i, x, y, flip) {

    var total = 0;

    // can not put block
    if (board[i][x][y] != BLOCK_KIND.NONE) {
      return total;
    }
    
    // check for 8 direction whether it is possible to turn over block
    for (var dx = -1; dx <= 1; dx++) {
      for(var dy = -1; dy <= 1; dy++) {

        if (dx == 0 && dy == 0) {
          continue;
        }
            
        var cnt = getCountIsPossibleToTurnOver(i, x, y, dx, dy);
          if (cnt > 0) {
            total += cnt;
            if (flip) {
              turnOverStraight(i, x, y, dx, dy);
            }
          }
      }
    }

    return total;
  };

  var doEditBoard = function() {
    $("#msg_kifu").hide();
    $("#simple_kifu").hide();
    if (edit_board == false) {
      saved_vsAI = vsAI;
      saved_isFirst = isFirst;
      saved_your_move = your_move;
      //alert("saved_your_move = " + your_move);
      //alert("saved_vsAI = " + vsAI);
      saved_from_saved = from_saved;
      //alert("temp_hand = " + temp_hand);

      saved_last_hand = last_hand;
      saved_temp_hand = temp_hand;
      //alert("saved_temp_hand = " + saved_temp_hand);
      //alert("temp_hand = " + temp_hand);
      //$("#a" + temp_hand).unwrap();
      saved_previous_temp_hand = previous_temp_hand;
      //alert("saved_previous_temp_hand = " + saved_previous_temp_hand);
      saved_beginning_flag = beginning_flag;
      //alert("saved_beginning_flag = " + saved_beginning_flag);
      saved_end_flag = end_flag;
      //alert("saved_end_flag = " + saved_end_flag);
      saved_link_flag = link_flag;
      //alert("saved_link_flag = " + saved_link_flag);
      saved_from_saved_first_flag = from_saved_first_flag;
      //alert("saved_from_saved_first_flag = " + saved_from_saved_first_flag);
      saved_for_jump_temp_hand = for_jump_temp_hand;
    }

    var b = document.getElementById("board");
	  
    while(b.firstChild) {
      b.removeChild(b.firstChild);
    }

    
    var c = document.getElementById("next_hand");

    var d = document.getElementById("stone_selection");
	  


    //  show corner frame

    var top_left_corner = corner.cloneNode(true);
    
    top_left_corner.style.left = 0 + "px";
    top_left_corner.style.top = 0 + "px";
    b.appendChild(top_left_corner);

    var top_right_corner = corner.cloneNode(true);

    top_right_corner.style.left = FRAME_WIDTH + (BOARD_SIZE.WIDTH * CELL_WIDTH) + "px";
    top_right_corner.style.top = 0 + "px";
    b.appendChild(top_right_corner);

    var bottom_left_corner = corner.cloneNode(true);

    bottom_left_corner.style.left = 0 + "px";
    bottom_left_corner.style.top = FRAME_WIDTH + (BOARD_SIZE.HEIGHT * CELL_WIDTH) + "px";
    b.appendChild(bottom_left_corner);

    var bottom_right_corner = corner.cloneNode(true);

    bottom_right_corner.style.left = FRAME_WIDTH + (BOARD_SIZE.WIDTH * CELL_WIDTH) + "px";
    bottom_right_corner.style.top = FRAME_WIDTH + (BOARD_SIZE.HEIGHT * CELL_WIDTH) + "px";
    b.appendChild(bottom_right_corner);

    // show frame and index
	  
    for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
	   
      
      var top_side_frame = side_frame.cloneNode(true);
     
      top_side_frame.style.left = FRAME_WIDTH + (x * CELL_WIDTH) + "px";
      top_side_frame.style.top = 0 + "px";
      top_side_frame.innerText = alphabet[x];
      b.appendChild(top_side_frame);
    }

    for(var x = 0; x <BOARD_SIZE.WIDTH; x++) {

      var bottom_side_frame = side_frame.cloneNode(true);

      bottom_side_frame.style.left = FRAME_WIDTH + (x * CELL_WIDTH) + "px";
      bottom_side_frame.style.top  = FRAME_WIDTH + (BOARD_SIZE.HEIGHT * CELL_WIDTH) + "px";
      b.appendChild(bottom_side_frame);
    }

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {

        var left_vertical_frame = vertical_frame.cloneNode(true);

        left_vertical_frame.style.left = 0 + "px";
        left_vertical_frame.style.top = FRAME_WIDTH + (y * CELL_WIDTH) + "px";
	left_vertical_frame.innerText = (y + 1).toString();
        
        b.appendChild(left_vertical_frame);
      }
    }

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {

        var right_vertical_frame = vertical_frame.cloneNode(true);

        right_vertical_frame.style.left = FRAME_WIDTH + (BOARD_SIZE.WIDTH * CELL_WIDTH) + "px";
        right_vertical_frame.style.top = FRAME_WIDTH + (y * CELL_WIDTH) + "px";
        b.appendChild(right_vertical_frame);
      }
    }

    // show cell

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        
	var cell = stone[board[0][x][y]].cloneNode(true);
                
        cell.style.left = FRAME_WIDTH + (x * CELL_WIDTH) + "px"; 
        cell.style.top = FRAME_WIDTH + (y * CELL_WIDTH) + "px"; 
        b.appendChild(cell);
      
    
    //show next hand

        var black_stone_next_hand = stone[BLOCK_KIND.BLACK].cloneNode(true);

	black_stone_next_hand.style.left = FRAME_WIDTH + 1 * CELL_WIDTH + "px";
        black_stone_next_hand.style.top = FRAME_WIDTH +  9 * CELL_WIDTH + "px";	      
        b.appendChild(black_stone_next_hand);

	var white_stone_next_hand = stone[BLOCK_KIND.WHITE].cloneNode(true);

        white_stone_next_hand.style.left = FRAME_WIDTH + 2 * CELL_WIDTH + "px";
        white_stone_next_hand.style.top = FRAME_WIDTH +  9 * CELL_WIDTH + "px";
        b.appendChild(white_stone_next_hand);
        
    //  show black_next yellow_frame corner

        var black_next_yellow_frame_top_left_corner = black_next_yellow_frame_corner.cloneNode(true);
    
        black_next_yellow_frame_top_left_corner.style.left = FRAME_WIDTH + 1 * CELL_WIDTH + "px";
        black_next_yellow_frame_top_left_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
       	
	var black_next_yellow_frame_top_right_corner = black_next_yellow_frame_corner.cloneNode(true);

        black_next_yellow_frame_top_right_corner.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
        black_next_yellow_frame_top_right_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //c.appendChild(black_next_yellow_frame_top_right_corner);

        var black_next_yellow_frame_bottom_left_corner = black_next_yellow_frame_corner.cloneNode(true);

        black_next_yellow_frame_bottom_left_corner.style.left = FRAME_WIDTH + 1 * CELL_WIDTH + "px";
        black_next_yellow_frame_bottom_left_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //c.appendChild(black_next_yellow_frame_bottom_left_corner);

        var black_next_yellow_frame_bottom_right_corner = black_next_yellow_frame_corner.cloneNode(true);

        black_next_yellow_frame_bottom_right_corner.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
        black_next_yellow_frame_bottom_right_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //c.appendChild(black_next_yellow_frame_bottom_right_corner);
    
    // show black_next yellow_frame frame

        var black_next_yellow_frame_top_side_frame = black_next_yellow_frame_side_frame.cloneNode(true);

        black_next_yellow_frame_top_side_frame.style.left = FRAME_WIDTH + 1 * CELL_WIDTH + "px";
        black_next_yellow_frame_top_side_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(black_next_yellow_frame_top_side_frame);


        var black_next_yellow_frame_bottom_side_frame = black_next_yellow_frame_side_frame.cloneNode(true);

        black_next_yellow_frame_bottom_side_frame.style.left = FRAME_WIDTH + 1 * CELL_WIDTH + "px";
        black_next_yellow_frame_bottom_side_frame.style.top  = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(black_next_yellow_frame_bottom_side_frame);

	      
        var black_next_yellow_frame_left_vertical_frame = black_next_yellow_frame_vertical_frame.cloneNode(true);

        black_next_yellow_frame_left_vertical_frame.style.left = FRAME_WIDTH + 1 * CELL_WIDTH  + "px";
        black_next_yellow_frame_left_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(black_next_yellow_frame_left_vertical_frame);


        var black_next_yellow_frame_right_vertical_frame = black_next_yellow_frame_vertical_frame.cloneNode(true);

        black_next_yellow_frame_right_vertical_frame.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
        black_next_yellow_frame_right_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(black_next_yellow_frame_right_vertical_frame);

         if (edit_flag == true) {
	  player_color = BLOCK_KIND.BLACK;
          player_color_array[0] = BLOCK_KIND.BLACK;
	  c.appendChild(black_next_yellow_frame_top_left_corner);
	  c.appendChild(black_next_yellow_frame_top_right_corner);
	  c.appendChild(black_next_yellow_frame_bottom_left_corner);
	  c.appendChild(black_next_yellow_frame_bottom_right_corner);
	  c.appendChild(black_next_yellow_frame_top_side_frame);
	  c.appendChild(black_next_yellow_frame_bottom_side_frame);
	  c.appendChild(black_next_yellow_frame_left_vertical_frame);
          c.appendChild(black_next_yellow_frame_right_vertical_frame);
          black_next_yellow_frame_length = 1;
        }
    

    //  show white_next yellow_frame corner

        var white_next_yellow_frame_top_left_corner = white_next_yellow_frame_corner.cloneNode(true);

        white_next_yellow_frame_top_left_corner.style.left = FRAME_WIDTH + 2 * CELL_WIDTH + "px";
        white_next_yellow_frame_top_left_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_next_yellow_frame_top_left_corner);

        var white_next_yellow_frame_top_right_corner = white_next_yellow_frame_corner.cloneNode(true);

        white_next_yellow_frame_top_right_corner.style.left = FRAME_WIDTH + 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
        white_next_yellow_frame_top_right_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_next_yellow_frame_top_right_corner);

        var white_next_yellow_frame_bottom_left_corner = white_next_yellow_frame_corner.cloneNode(true);

        white_next_yellow_frame_bottom_left_corner.style.left = FRAME_WIDTH + 2 * CELL_WIDTH + "px";
        white_next_yellow_frame_bottom_left_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(white_next_yellow_frame_bottom_left_corner);

        var white_next_yellow_frame_bottom_right_corner = white_next_yellow_frame_corner.cloneNode(true);

        white_next_yellow_frame_bottom_right_corner.style.left = FRAME_WIDTH + 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
        white_next_yellow_frame_bottom_right_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(white_next_yellow_frame_bottom_right_corner);

    // show white_next yellow_frame frame

        var white_next_yellow_frame_top_side_frame = white_next_yellow_frame_side_frame.cloneNode(true);

        white_next_yellow_frame_top_side_frame.style.left = FRAME_WIDTH + 2 * CELL_WIDTH + "px";
        white_next_yellow_frame_top_side_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_next_yellow_frame_top_side_frame);


        var white_next_yellow_frame_bottom_side_frame = white_next_yellow_frame_side_frame.cloneNode(true);

        white_next_yellow_frame_bottom_side_frame.style.left = FRAME_WIDTH + 2 * CELL_WIDTH + "px";
        white_next_yellow_frame_bottom_side_frame.style.top  = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(white_next_yellow_frame_bottom_side_frame);


        var white_next_yellow_frame_left_vertical_frame = white_next_yellow_frame_vertical_frame.cloneNode(true);

        white_next_yellow_frame_left_vertical_frame.style.left = FRAME_WIDTH + 2 * CELL_WIDTH  + "px";
        white_next_yellow_frame_left_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_next_yellow_frame_left_vertical_frame);


        var white_next_yellow_frame_right_vertical_frame = white_next_yellow_frame_vertical_frame.cloneNode(true);

        white_next_yellow_frame_right_vertical_frame.style.left = FRAME_WIDTH + 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
        white_next_yellow_frame_right_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_next_yellow_frame_right_vertical_frame);


    // show stone choice cell

	var black_stone_choice = stone[BLOCK_KIND.BLACK].cloneNode(true);

	black_stone_choice.style.left = FRAME_WIDTH + 5 * CELL_WIDTH + "px";
	black_stone_choice.style.top = FRAME_WIDTH +  9 * CELL_WIDTH + "px";
 	b.appendChild(black_stone_choice);

        var white_stone_choice = stone[BLOCK_KIND.WHITE].cloneNode(true);

        white_stone_choice.style.left = FRAME_WIDTH + 6 * CELL_WIDTH + "px";
        white_stone_choice.style.top = FRAME_WIDTH +  9 * CELL_WIDTH + "px";
	b.appendChild(white_stone_choice);

	var none_stone_choice = stone[BLOCK_KIND.NONE].cloneNode(true);

        none_stone_choice.style.left = FRAME_WIDTH + 7 * CELL_WIDTH + "px";
        none_stone_choice.style.top = FRAME_WIDTH +  9 * CELL_WIDTH + "px";
	b.appendChild(none_stone_choice);

    //  show black_select yellow_frame corner

        var black_select_yellow_frame_top_left_corner = black_select_yellow_frame_corner.cloneNode(true);

        black_select_yellow_frame_top_left_corner.style.left = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        black_select_yellow_frame_top_left_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        
        var black_select_yellow_frame_top_right_corner = black_select_yellow_frame_corner.cloneNode(true);

        black_select_yellow_frame_top_right_corner.style.left = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        black_select_yellow_frame_top_right_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //d.appendChild(black_select_yellow_frame_top_right_corner);

        var black_select_yellow_frame_bottom_left_corner = black_select_yellow_frame_corner.cloneNode(true);

        black_select_yellow_frame_bottom_left_corner.style.left = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        black_select_yellow_frame_bottom_left_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //d.appendChild(black_select_yellow_frame_bottom_left_corner);

        var black_select_yellow_frame_bottom_right_corner = black_select_yellow_frame_corner.cloneNode(true);

        black_select_yellow_frame_bottom_right_corner.style.left = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        black_select_yellow_frame_bottom_right_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //d.appendChild(black_select_yellow_frame_bottom_right_corner);

    // show black_select yellow_frame frame

        var black_select_yellow_frame_top_side_frame = black_select_yellow_frame_side_frame.cloneNode(true);

        black_select_yellow_frame_top_side_frame.style.left = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        black_select_yellow_frame_top_side_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(black_select_yellow_frame_top_side_frame);


        var black_select_yellow_frame_bottom_side_frame = black_select_yellow_frame_side_frame.cloneNode(true);

        black_select_yellow_frame_bottom_side_frame.style.left = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        black_select_yellow_frame_bottom_side_frame.style.top  = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(black_select_yellow_frame_bottom_side_frame);


        var black_select_yellow_frame_left_vertical_frame = black_select_yellow_frame_vertical_frame.cloneNode(true);

        black_select_yellow_frame_left_vertical_frame.style.left = FRAME_WIDTH + 0 * CELL_WIDTH  + "px";
        black_select_yellow_frame_left_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(black_select_yellow_frame_left_vertical_frame);


        var black_select_yellow_frame_right_vertical_frame = black_select_yellow_frame_vertical_frame.cloneNode(true);

        black_select_yellow_frame_right_vertical_frame.style.left = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        black_select_yellow_frame_right_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(black_select_yellow_frame_right_vertical_frame);

        if (edit_flag == true) {
	  choiced_stone_color = BLOCK_KIND.BLACK;
	  d.appendChild(black_select_yellow_frame_top_left_corner);
          d.appendChild(black_select_yellow_frame_top_right_corner);
          d.appendChild(black_select_yellow_frame_bottom_left_corner);
          d.appendChild(black_select_yellow_frame_bottom_right_corner);
          d.appendChild(black_select_yellow_frame_top_side_frame);
          d.appendChild(black_select_yellow_frame_bottom_side_frame);
          d.appendChild(black_select_yellow_frame_left_vertical_frame);
          d.appendChild(black_select_yellow_frame_right_vertical_frame);
          black_select_yellow_frame_length = 1;
	}



    //  show white_select yellow_frame corner

        var white_select_yellow_frame_top_left_corner = white_select_yellow_frame_corner.cloneNode(true);

        white_select_yellow_frame_top_left_corner.style.left = FRAME_WIDTH + 1 * CELL_WIDTH + "px";
        white_select_yellow_frame_top_left_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_select_yellow_frame_top_left_corner);

        var white_select_yellow_frame_top_right_corner = white_select_yellow_frame_corner.cloneNode(true);

        white_select_yellow_frame_top_right_corner.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
        white_select_yellow_frame_top_right_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_select_yellow_frame_top_right_corner);

        var white_select_yellow_frame_bottom_left_corner = white_select_yellow_frame_corner.cloneNode(true);

        white_select_yellow_frame_bottom_left_corner.style.left = FRAME_WIDTH + 1 * CELL_WIDTH + "px";
        white_select_yellow_frame_bottom_left_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(white_select_yellow_frame_bottom_left_corner);

        var white_select_yellow_frame_bottom_right_corner = white_select_yellow_frame_corner.cloneNode(true);

        white_select_yellow_frame_bottom_right_corner.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
        white_select_yellow_frame_bottom_right_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(white_select_yellow_frame_bottom_right_corner);

    // show white_select yellow_frame frame

        var white_select_yellow_frame_top_side_frame = white_select_yellow_frame_side_frame.cloneNode(true);

        white_select_yellow_frame_top_side_frame.style.left = FRAME_WIDTH + 1 * CELL_WIDTH + "px";
        white_select_yellow_frame_top_side_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_select_yellow_frame_top_side_frame);


        var white_select_yellow_frame_bottom_side_frame = white_select_yellow_frame_side_frame.cloneNode(true);

        white_select_yellow_frame_bottom_side_frame.style.left = FRAME_WIDTH + 1 * CELL_WIDTH + "px";
        white_select_yellow_frame_bottom_side_frame.style.top  = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(white_select_yellow_frame_bottom_side_frame);


        var white_select_yellow_frame_left_vertical_frame = white_select_yellow_frame_vertical_frame.cloneNode(true);

        white_select_yellow_frame_left_vertical_frame.style.left = FRAME_WIDTH + 1 * CELL_WIDTH  + "px";
        white_select_yellow_frame_left_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_select_yellow_frame_left_vertical_frame);


        var white_select_yellow_frame_right_vertical_frame = white_select_yellow_frame_vertical_frame.cloneNode(true);

        white_select_yellow_frame_right_vertical_frame.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
        white_select_yellow_frame_right_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(white_select_yellow_frame_right_vertical_frame);

    //  show none_select yellow_frame corner

        var none_select_yellow_frame_top_left_corner = none_select_yellow_frame_corner.cloneNode(true);

        none_select_yellow_frame_top_left_corner.style.left = FRAME_WIDTH + 2 * CELL_WIDTH + "px";
        none_select_yellow_frame_top_left_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(none_select_yellow_frame_top_left_corner);

        var none_select_yellow_frame_top_right_corner = none_select_yellow_frame_corner.cloneNode(true);

        none_select_yellow_frame_top_right_corner.style.left = FRAME_WIDTH + 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
        none_select_yellow_frame_top_right_corner.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(none_select_yellow_frame_top_right_corner);

        var none_select_yellow_frame_bottom_left_corner = none_select_yellow_frame_corner.cloneNode(true);

        none_select_yellow_frame_bottom_left_corner.style.left = FRAME_WIDTH + 2 * CELL_WIDTH + "px";
        none_select_yellow_frame_bottom_left_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(none_select_yellow_frame_bottom_left_corner);

        var none_select_yellow_frame_bottom_right_corner = none_select_yellow_frame_corner.cloneNode(true);

        none_select_yellow_frame_bottom_right_corner.style.left = FRAME_WIDTH + 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
        none_select_yellow_frame_bottom_right_corner.style.top = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(none_select_yellow_frame_bottom_right_corner);

    // show none_select yellow_frame frame

        var none_select_yellow_frame_top_side_frame = none_select_yellow_frame_side_frame.cloneNode(true);

        none_select_yellow_frame_top_side_frame.style.left = FRAME_WIDTH + 2 * CELL_WIDTH + "px";
        none_select_yellow_frame_top_side_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(none_select_yellow_frame_top_side_frame);


        var none_select_yellow_frame_bottom_side_frame = none_select_yellow_frame_side_frame.cloneNode(true);

        none_select_yellow_frame_bottom_side_frame.style.left = FRAME_WIDTH + 2 * CELL_WIDTH + "px";
        none_select_yellow_frame_bottom_side_frame.style.top  = FRAME_WIDTH + 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
        //b.appendChild(none_select_yellow_frame_bottom_side_frame);


        var none_select_yellow_frame_left_vertical_frame = none_select_yellow_frame_vertical_frame.cloneNode(true);

        none_select_yellow_frame_left_vertical_frame.style.left = FRAME_WIDTH + 2 * CELL_WIDTH  + "px";
        none_select_yellow_frame_left_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(none_select_yellow_frame_left_vertical_frame);


        var none_select_yellow_frame_right_vertical_frame = none_select_yellow_frame_vertical_frame.cloneNode(true);

        none_select_yellow_frame_right_vertical_frame.style.left = FRAME_WIDTH + 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
        none_select_yellow_frame_right_vertical_frame.style.top = FRAME_WIDTH + 0 * CELL_WIDTH + "px";
        //b.appendChild(none_select_yellow_frame_right_vertical_frame);
            
	 
    // show dot        

	var top_left_dot = dot.cloneNode(true);

        top_left_dot.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - 3 + "px";
        top_left_dot.style.top = FRAME_WIDTH + 2 * CELL_WIDTH - 3 + "px";
        b.appendChild(top_left_dot);

	var top_right_dot = dot.cloneNode(true);

        top_right_dot.style.left = FRAME_WIDTH + 6 * CELL_WIDTH - 3 + "px";
        top_right_dot.style.top = FRAME_WIDTH + 2 * CELL_WIDTH - 3 + "px";
        b.appendChild(top_right_dot);
 
        var bottom_left_dot = dot.cloneNode(true);

        bottom_left_dot.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - 3 + "px";
        bottom_left_dot.style.top = FRAME_WIDTH + 6 * CELL_WIDTH - 3 + "px";
        b.appendChild(bottom_left_dot);

	var bottom_right_dot = dot.cloneNode(true);

        bottom_right_dot.style.left = FRAME_WIDTH + 6 * CELL_WIDTH - 3 + "px";
        bottom_right_dot.style.top = FRAME_WIDTH + 6 * CELL_WIDTH - 3 + "px";
        b.appendChild(bottom_right_dot);    
      
	      
	(function() {
          var _x = x;
          var _y = y;
        
            black_stone_next_hand.onclick = function() {
	    player_color = BLOCK_KIND.BLACK;
	    player_color_array[0] = BLOCK_KIND.BLACK;
	    if (white_next_yellow_frame_length > 0) {
              while(c.firstChild) {
                c.removeChild(c.firstChild);
              }
	      //white_next_yellow_frame_top_left_corner.remove();
	      white_next_yellow_frame_length -= 1;
            }
	    if (black_next_yellow_frame_length == 0) {
	      c.append(black_next_yellow_frame_top_left_corner);
              c.append(black_next_yellow_frame_top_right_corner);
              c.append(black_next_yellow_frame_bottom_left_corner);
              c.append(black_next_yellow_frame_bottom_right_corner);
              c.append(black_next_yellow_frame_top_side_frame);
              c.append(black_next_yellow_frame_bottom_side_frame);
              c.append(black_next_yellow_frame_left_vertical_frame);
              c.append(black_next_yellow_frame_right_vertical_frame);
	      black_next_yellow_frame_length += 1;	    
            }
          };

	  white_stone_next_hand.onclick = function() {
            player_color = BLOCK_KIND.WHITE;
	    player_color_array[0] = BLOCK_KIND.WHITE;
	    if (black_next_yellow_frame_length > 0) {
	       while(c.firstChild) {
                c.removeChild(c.firstChild);
              }
	      //black_next_yellow_frame_top_left_corner.remove();
	      black_next_yellow_frame_length -= 1;
            }
            if (white_next_yellow_frame_length == 0) {  
	      c.append(white_next_yellow_frame_top_left_corner);
              c.append(white_next_yellow_frame_top_right_corner);
              c.append(white_next_yellow_frame_bottom_left_corner);
              c.append(white_next_yellow_frame_bottom_right_corner);
              c.append(white_next_yellow_frame_top_side_frame);
              c.append(white_next_yellow_frame_bottom_side_frame);
              c.append(white_next_yellow_frame_left_vertical_frame);
              c.append(white_next_yellow_frame_right_vertical_frame);
	      white_next_yellow_frame_length += 1;
            }
	  };
          

          black_stone_choice.onclick = function() {
	    choiced_stone_color = BLOCK_KIND.BLACK;
            if (white_select_yellow_frame_length > 0) {
              while(d.firstChild) {
                d.removeChild(d.firstChild);
              }
	      white_select_yellow_frame_length -= 1;
	    }
            if (none_select_yellow_frame_length > 0) {
              while(d.firstChild) {
                d.removeChild(d.firstChild);
              }
              none_select_yellow_frame_length -= 1;
            }
	    if (black_select_yellow_frame_length == 0) {
	      d.append(black_select_yellow_frame_top_left_corner);
              d.append(black_select_yellow_frame_top_right_corner);
              d.append(black_select_yellow_frame_bottom_left_corner);
              d.append(black_select_yellow_frame_bottom_right_corner);
              d.append(black_select_yellow_frame_top_side_frame);
              d.append(black_select_yellow_frame_bottom_side_frame);
              d.append(black_select_yellow_frame_left_vertical_frame);
              d.append(black_select_yellow_frame_right_vertical_frame);
	      black_select_yellow_frame_length += 1;
	    }
	  };
 
          white_stone_choice.onclick = function() {
	    choiced_stone_color = BLOCK_KIND.WHITE;
            if (black_select_yellow_frame_length > 0) {
              while(d.firstChild) {
                d.removeChild(d.firstChild);
              }
              black_select_yellow_frame_length -= 1;
            }
            if (none_select_yellow_frame_length > 0) {
              while(d.firstChild) {
                d.removeChild(d.firstChild);
              }
              none_select_yellow_frame_length -= 1;
            }
            if (white_select_yellow_frame_length == 0) {
	      d.append(white_select_yellow_frame_top_left_corner);
              d.append(white_select_yellow_frame_top_right_corner);
              d.append(white_select_yellow_frame_bottom_left_corner);
              d.append(white_select_yellow_frame_bottom_right_corner);
              d.append(white_select_yellow_frame_top_side_frame);
              d.append(white_select_yellow_frame_bottom_side_frame);
              d.append(white_select_yellow_frame_left_vertical_frame);
              d.append(white_select_yellow_frame_right_vertical_frame);
              white_select_yellow_frame_length += 1;
            }
          };

	  none_stone_choice.onclick = function() {
	    choiced_stone_color = BLOCK_KIND.NONE;
            if (black_select_yellow_frame_length > 0) {
              while(d.firstChild) {
                d.removeChild(d.firstChild);
              }
              black_select_yellow_frame_length -= 1;
            }
            if (white_select_yellow_frame_length > 0) {
              while(d.firstChild) {
                d.removeChild(d.firstChild);
              }
              white_select_yellow_frame_length -= 1;
            }
            if (none_select_yellow_frame_length == 0) {
              d.append(none_select_yellow_frame_top_left_corner);
              d.append(none_select_yellow_frame_top_right_corner);
              d.append(none_select_yellow_frame_bottom_left_corner);
              d.append(none_select_yellow_frame_bottom_right_corner);
              d.append(none_select_yellow_frame_top_side_frame);
              d.append(none_select_yellow_frame_bottom_side_frame);
              d.append(none_select_yellow_frame_left_vertical_frame);
              d.append(none_select_yellow_frame_right_vertical_frame);
              none_select_yellow_frame_length += 1;
            }
          };
	  
	  
          cell.onclick = function() {
	    //alert("クリックしました。");
	    board[0][_x][_y] = choiced_stone_color;
	    edit_flag = false;
	    doEditBoard();
          };
        })();
      }
    }
    //showProgress(i);    
  };

	  

  var showBoard = function(i) {
    
    //i = temp_hand;    

    var b = document.getElementById("board");
        
    while(b.firstChild) {
      b.removeChild(b.firstChild);
    }

	  
    //  show corner frame

    var top_left_corner = corner.cloneNode(true);
    
    top_left_corner.style.left = 0 + "px";
    top_left_corner.style.top = 0 + "px";
    b.appendChild(top_left_corner);

    var top_right_corner = corner.cloneNode(true);

    top_right_corner.style.left = FRAME_WIDTH + (BOARD_SIZE.WIDTH * CELL_WIDTH) + "px";
    top_right_corner.style.top = 0 + "px";
    b.appendChild(top_right_corner);

    var bottom_left_corner = corner.cloneNode(true);

    bottom_left_corner.style.left = 0 + "px";
    bottom_left_corner.style.top = FRAME_WIDTH + (BOARD_SIZE.HEIGHT * CELL_WIDTH) + "px";
    b.appendChild(bottom_left_corner);

    var bottom_right_corner = corner.cloneNode(true);

    bottom_right_corner.style.left = FRAME_WIDTH + (BOARD_SIZE.WIDTH * CELL_WIDTH) + "px";
    bottom_right_corner.style.top = FRAME_WIDTH + (BOARD_SIZE.HEIGHT * CELL_WIDTH) + "px";
    b.appendChild(bottom_right_corner);

    // show frame and index
	  
    for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
      
      var top_side_frame = side_frame.cloneNode(true);
      
      top_side_frame.style.left = FRAME_WIDTH + (x * CELL_WIDTH) + "px";
      top_side_frame.style.top = 0 + "px";
      top_side_frame.innerText = alphabet[x];
      b.appendChild(top_side_frame);
    }

    for(var x = 0; x <BOARD_SIZE.WIDTH; x++) {

      var bottom_side_frame = side_frame.cloneNode(true);

      bottom_side_frame.style.left = FRAME_WIDTH + (x * CELL_WIDTH) + "px";
      bottom_side_frame.style.top  = FRAME_WIDTH + (BOARD_SIZE.HEIGHT * CELL_WIDTH) + "px";
      b.appendChild(bottom_side_frame);
    }

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {

        var left_vertical_frame = vertical_frame.cloneNode(true);

        left_vertical_frame.style.left = 0 + "px";
        left_vertical_frame.style.top = FRAME_WIDTH + (y * CELL_WIDTH) + "px";
	left_vertical_frame.innerText = (y + 1).toString();
        
        b.appendChild(left_vertical_frame);
      }
    }

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {

        var right_vertical_frame = vertical_frame.cloneNode(true);

        right_vertical_frame.style.left = FRAME_WIDTH + (BOARD_SIZE.WIDTH * CELL_WIDTH) + "px";
        right_vertical_frame.style.top = FRAME_WIDTH + (y * CELL_WIDTH) + "px";
        b.appendChild(right_vertical_frame);
      }
    }

    // show cell

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        
	var cell = stone[board[i][x][y]].cloneNode(true);
                
        cell.style.left = FRAME_WIDTH + (x * CELL_WIDTH) + "px"; 
        cell.style.top = FRAME_WIDTH + (y * CELL_WIDTH) + "px"; 
        b.appendChild(cell);

    
    // show dot        

	var top_left_dot = dot.cloneNode(true);

        top_left_dot.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - 3 + "px";
        top_left_dot.style.top = FRAME_WIDTH + 2 * CELL_WIDTH - 3 + "px";
        b.appendChild(top_left_dot);

	var top_right_dot = dot.cloneNode(true);

        top_right_dot.style.left = FRAME_WIDTH + 6 * CELL_WIDTH - 3 + "px";
        top_right_dot.style.top = FRAME_WIDTH + 2 * CELL_WIDTH - 3 + "px";
        b.appendChild(top_right_dot);
 
        var bottom_left_dot = dot.cloneNode(true);

        bottom_left_dot.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - 3 + "px";
        bottom_left_dot.style.top = FRAME_WIDTH + 6 * CELL_WIDTH - 3 + "px";
        b.appendChild(bottom_left_dot);

	var bottom_right_dot = dot.cloneNode(true);

        bottom_right_dot.style.left = FRAME_WIDTH + 6 * CELL_WIDTH - 3 + "px";
        bottom_right_dot.style.top = FRAME_WIDTH + 6 * CELL_WIDTH - 3 + "px";
        b.appendChild(bottom_right_dot);

        (function() {
          var _x = x;
          var _y = y;
          cell.onclick = function() {
	    //alert("クリックしました。");
            for (var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++) {
	      for (var xx = 0; xx < BOARD_SIZE.WIDTH; xx++ ) {
	          board[i+1][xx][yy] = board[i][xx][yy];
	      }
	    }
	    if (turnOverBlock(i+1, _x, _y, true) > 0) {
	      board[i+1][_x][_y] = player_color;
	      //if (isPass(i+1) == false) {
	      //	player_color_array[i+1] = BLOCK_KIND.MAX - player_color;
	      //} else {
	      // 	player_color_array[i+1] = player_color;
	      //}
	      i++;
	      previous_temp_hand = temp_hand;
	      temp_hand++;
	      last_hand = temp_hand;
	
	      kifu = kifu.slice(0, (temp_hand - 1) * 2);
              
	      var number_str;
              if (temp_hand < 10) {
		number_str = " " + temp_hand;
              } else {
		number_str = temp_hand;
	      }
	      if (player_color == BLOCK_KIND.BLACK) {
		kifu = kifu + Alphabet[_x];
	        display_kifu[temp_hand] = number_str + ": " + Alphabet[_x];
	      } else if (player_color == BLOCK_KIND.WHITE) {
                kifu = kifu + alphabet[_x];
		display_kifu[temp_hand] = number_str + ": " + alphabet[_x];
	      }
              display_kifu[temp_hand] = display_kifu[temp_hand] + (_y + 1).toString(); 
              kifu = kifu + (_y + 1).toString();
	      wrap_flag = true;
	      beginning_flag = false;
              end_flag = false;
	      link_flag = false;
	      from_saved_first_flag = false;
	      cancel_flag = false;
	      showBoard(i);
              if (!changePlayer(i)) {
		doAiPlayer(i);
              } 
	    }
          };
        })();
      }
    }
    showProgress(i);  
  };


  var showProgress = function(i) {
    var black = 0;
    var white = 0;

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        if (board[i][x][y] == BLOCK_KIND.BLACK) {
          black++;
        } else if (board[i][x][y] == BLOCK_KIND.WHITE) {
          white++;
        } else {
          // no opereation
        }
      }
    }

//  var msg = document.getElementById("msg");
//  msg.innerHTML = "progress of territory  black:"+black+" white:"+white;

    //var msg_kifu = document.getElementById("msg_kifu");
    
    var black_count = document.getElementById("black_count");
    black_count.innerHTML = black;

    var white_count = document.getElementById("white_count");
    white_count.innerHTML = white;

    var simple_kifu = document.getElementById("simple_kifu");
    simple_kifu.innerHTML = kifu;
    for (var i = 0; i <= 64; i++) {
      $("#a" +  i).val(display_kifu[i]);
    }  
    for (var i = 1; i <= 64; i++) {
      if (last_hand < i) {
	$("#a" + i).hide();
      } else {
	$("#a" + i).show();
      }
    } 
    $("#a" + temp_hand).css("color", "#ffffff");
    $("#a" + temp_hand).css("background-color", "blue");
    for (var i = 0; i <= 63; i++) {
      if (i !=  temp_hand) {
	$("#a" + i).css("color", "#000000");
	$("#a" + i).css("background-color", "#ffffff");
      }
    }
    if (i == 64) {
      if (temp_hand < 64) {
	$("#a" + i).css("color", "#000000");
        $("#a" + i).css("background-color", "#ffffff");
      }
    }
    //alert("temp_hand = " + temp_hand);
    //alert("previous_temp_hand = " + previous_temp_hand);
    //alert("for_jump_temp_hand = " + for_jump_temp_hand);
    //alert("last_hand = " + last_hand);
    //alert("wrap_flag = " + wrap_flag);
    //alert("end_flag = " + end_flag);
    
    if (wrap_flag == true) {
      $("#a" + temp_hand).wrap('<span id="last-msg"></span>');
    }

    if (!(beginning_flag == true || end_flag == true || link_flag == true)) { 
      if (temp_hand == previous_temp_hand + 1 || temp_hand == previous_temp_hand - 1) {
        if (from_saved_first_flag == false) {
	  if (cancel_flag == false) {
	    $("#a" + previous_temp_hand).unwrap();
	  }
        }
      }
    }
  
    if (beginning_flag == true) {
      if (for_jump_temp_hand - 0 >= 1) {
	if (cancel_flag == false) {
          $("#a" + for_jump_temp_hand).unwrap();
        }
      }
    } else if (end_flag == true) {
      if (last_hand - for_jump_temp_hand >= 1) {
	if (cancel_flag == false) {
	  $("#a" + for_jump_temp_hand).unwrap();
	}
      }
    } else if (link_flag == true) {
      if (temp_hand - for_jump_temp_hand >= 1) {
	if (cancel_flag == false) {
	  $("#a" + for_jump_temp_hand).unwrap();
        }
      } else if (for_jump_temp_hand - temp_hand >= 1) {
	if (cancel_flag == false) {
	  $("#a" + for_jump_temp_hand).unwrap();
	}
      }
    }
    /*	  
    var parent = document.getElementById("msg_kifu");
    parent.insertAdjacentHTML('beforeend', '<input type="button" id="a1" value="１手目">');
    */
	  
    /*
    var parent = document.getElementById("msg_kifu");
    
    var child = document.createElement("input");
 
    child.setAttribute("type","button");
    child.setAttribute("id","a1");
    child.setAttribute("value","１手目");
           
    parent.appendChild(child);
    */
    
    /*
    msg_kifu.innerHTML = kifu_highlight;
    */
    var $box = $($(".link").data("box"));
    var $tareget = $($(".link").attr("href"));
    var dist = $tareget.position().top - $box.position().top;
    $box.stop().animate({
      scrollTop: $box.scrollTop() + dist
    });
    

              
    if (allSameColor(i)) {
      if(player_color == BLOCK_KIND.BLACK) {
        alert("黒のパーフェクト勝ちです。1");
      } else if (player_color == BLOCK_KIND.WHITE) {
        alert("白のパーフェクト勝ちです。1");   
      } else {
        alert("invalid status 4");
      }
    } else {
      if (black + white == 64 || isFinished == true ) {
        if (black > white) {
          alert("黒の勝ちです。");
        } else if(white > black) {
	  alert("白の勝ちです。");
　　　  } else {
	  alert("引き分けです。");
        }
      }
    }

    isFinished = false;
  };

  var isFinish = function(i) {

    var finish = true;

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        if (board[i][x][y] == BLOCK_KIND.NONE) {
	  finish = false;
	}
      }
    }

    return finish;
  };
                 
  var allBlackColor = function(i) {

    var same = true;     

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        if (board[i][x][y] == BLOCK_KIND.WHITE) {
	   same =  false;
        }
      }
    }

    return  same;
  };


  var allWhiteColor = function(i) {

    var same = true;     

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        if (board[i][x][y] == BLOCK_KIND.BLACK) {
	   same =  false;
        }
      }
    }

    return  same;
  };



  var allSameColor = function(i) { 

    return  allBlackColor(i) || allWhiteColor(i);

  };

	
  var changePlayer = function(i) {
    var pass = false;
    player_color = BLOCK_KIND.MAX - player_color;
    player_color_array[i] = player_color;
    if (isPass(i) && !isFinish(i)) {
      if(player_color == BLOCK_KIND.BLACK) {
        alert("黒の置ける場所がありません。続けて白の番となります。");
      } else if (player_color == BLOCK_KIND.WHITE) {
        alert("白の置ける場所がありません。続けて黒の番となります。");
      } else {
        alert("invalid status 1");
      }
        
      player_color = BLOCK_KIND.MAX - player_color;
      player_color_array[i] = player_color;
      if(isPass(i) && !isFinish(i)) {
        if (!(allSameColor())) {
	  if(player_color == BLOCK_KIND.BLACK) {
            alert("黒も置ける場所がありません。試合終了です。");
          } else if (player_color == BLOCK_KIND.WHITE) {
            alert("白も置ける場所がありません。試合終了です。");
          } else {
            alert("invalid status 3");
          }
        }
	
        isFinished = true;
      }

      pass = true;
    }

    return pass;
  };

  var doAiPlayer = function(i) {


    if(vsAI == false) {
      //alert("vsAI = " + vsAI);
      return false;
    }

    if( (isFirst && (player_color == BLOCK_KIND.BLACK)) ||
      (!isFirst && (player_color == BLOCK_KIND.WHITE)) ) {
      return false;
    }

    for (var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++) {
      for (var xx = 0; xx < BOARD_SIZE.WIDTH; xx++ ) {
        board[i+1][xx][yy] = board[i][xx][yy];
      }
    }
    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
	if (turnOverBlock(i+1, x, y, true) > 0) {
          board[i+1][x][y] = player_color;
          //if (isPass(i+1) == false) {
          //  player_color_array[i+1] = BLOCK_KIND.MAX - player_color;
          //} else {
          //  player_color_array[i+1] = player_color;
          //}
          i++;
	  
          previous_temp_hand = temp_hand;
          temp_hand++;
          last_hand = temp_hand;
          
          var number_str;
          if (temp_hand < 10) {
            number_str = " " + temp_hand;
          } else {
            number_str = temp_hand;
          }
          if (player_color == BLOCK_KIND.BLACK) {
	    kifu = kifu + Alphabet[x];       	  
            display_kifu[temp_hand] = number_str + ": " + Alphabet[x];
          } else if (player_color == BLOCK_KIND.WHITE) {
            kifu = kifu + alphabet[x];
	    display_kifu[temp_hand] = number_str + ": " + alphabet[x];
          }
          display_kifu[temp_hand] = display_kifu[temp_hand] + (y + 1).toString();
	  kifu = kifu + (y + 1).toString();
          wrap_flag = true;
          beginning_flag = false;
          end_flag = false;
          link_flag = false;
	  from_saved_first_flag = false;
	  cancel_flag = false;
          showBoard(i);
	  if (changePlayer(i)) {
            doAiPlayer(i);
          }
	  return true;
        }
      }
    }

    return false;
  };
	  
　var isPass = function(i) {
   
    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {    
        if (turnOverBlock(i, x, y, false)   > 0) {
          return false;
        }
      }
    }
    
    return true;
　};

  var msleep = function(ms) {

    var d1 = new Date().getTime();
    var d2 = new Date().getTime();
    while ( d2 < (d1 + ms) ) {
      d2 = new Date().getTime();
    }
  };


　var initBoard = function() {

    Object.freeze(BLOCK_KIND);
    Object.freeze(BOARD_SIZE);
    Object.freeze(FRAME_WIDTH);
    Object.freeze(CELL_WIDTH);

    player_color = BLOCK_KIND.BLACK;
    player_color_array[0] = BLOCK_KIND.BLACK;
    
    // 0:石無し, 1:黒, 2:白
    dot =
      document.getElementById("dot");
    corner =
      document.getElementById("corner");
    side_frame = 
      document.getElementById("side_frame");
    vertical_frame =
      document.getElementById("vertical_frame");
    black_next_yellow_frame_corner =
      document.getElementById("yellow_frame_corner");
    black_next_yellow_frame_side_frame =
      document.getElementById("yellow_frame_side_frame");
    black_next_yellow_frame_vertical_frame =
      document.getElementById("yellow_frame_vertical_frame");
    white_next_yellow_frame_corner =
      document.getElementById("yellow_frame_corner");
    white_next_yellow_frame_side_frame =
      document.getElementById("yellow_frame_side_frame");
    white_next_yellow_frame_vertical_frame =
      document.getElementById("yellow_frame_vertical_frame");
    black_select_yellow_frame_corner =
      document.getElementById("yellow_frame_corner");
    black_select_yellow_frame_side_frame =
      document.getElementById("yellow_frame_side_frame");
    black_select_yellow_frame_vertical_frame =
      document.getElementById("yellow_frame_vertical_frame");
    white_select_yellow_frame_corner =
      document.getElementById("yellow_frame_corner");
    white_select_yellow_frame_side_frame =
      document.getElementById("yellow_frame_side_frame");
    white_select_yellow_frame_vertical_frame =
      document.getElementById("yellow_frame_vertical_frame");
    none_select_yellow_frame_corner =
      document.getElementById("yellow_frame_corner");
    none_select_yellow_frame_side_frame =
      document.getElementById("yellow_frame_side_frame");
    none_select_yellow_frame_vertical_frame =
      document.getElementById("yellow_frame_vertical_frame");
    stone = [
      document.getElementById("cell"),
      document.getElementById("black"),
      document.getElementById("white")
    ];
 
    // init zero value
    for(var k = 0; k <= 64; k++) {
      board[k] = [];
      for (var i = 0; i < BOARD_SIZE.HEIGHT+1; i++) {
        board[k][i] = [];
        for (var j = 0; j < BOARD_SIZE.WIDTH+1; j++) {
          board[k][i][j] = BLOCK_KIND.NONE;
        }
      }
    }

    // initial position
    for(var k = 0; k <= 64; k++) {
      board[k][3][4] = BLOCK_KIND.BLACK;
      board[k][4][3] = BLOCK_KIND.BLACK;
      board[k][3][3] = BLOCK_KIND.WHITE;
      board[k][4][4] = BLOCK_KIND.WHITE;
    }

    display_kifu[0] = "開始";
    kifu = "";

  };

//  var initRecord = function() {

    // initial kifu
//    display_kifu[0] = "開始";
//    kifu = "";
//  };

  onload = function() {
    // just in case
    //Object.freeze(BLOCK_KIND);
    //Object.freeze(BOARD_SIZE);
    //Object.freeze(FRAME_WIDTH);
    //Object.freeze(CELL_WIDTH);
    // initialize board
    //initBoard();
    // start game
    //initRecord();

    var clipboard = new Clipboard(".copy_clipboard");

    from_saved = gon.from_saved;
    your_move = gon.your_move;
    vsAI = gon.vsAI;
    edit_board = gon.edit_board;
   
    //alert("from_saved = " + from_saved);
    //alert("your_move = " + your_move);
    //alert("vsAI = " + vsAI);
   
    if(your_move == "first") {
      isFirst = true;
    } else if(your_move == "second") {
      isFirst = false;
    }

    if (vsAI == true) {
      $("#Computer_checkbox").prop("checked",true);
    }
    if (your_move == "first") {
      $("#First_checkbox").prop("checked",true);
    }
	  
    alert("edit_board = " + edit_board);
    
    initBoard();
    //alert("board[0](initBoard() = " + board[0]);      
    board0 = gon.board0;
    //alert("board0(gon.board0) = " + board0);
    player_color0 = gon.player_color0;
    //alert("player_color0 = " + player_color0);
    if (edit_board == true) {
      edit_flag = true;
      doEditBoard();
    }


   
    //alert(isFirst);

    alert("from_saved = " + from_saved);

    if (edit_board == false) {
      //alert("edit_board = " + edit_board);
      $("#edit_board_ok").hide();
      $("#edit_board_cancel").hide();
      $("#next_hand_text").hide();
      $("#stone_selection_text").hide();
      $("#next_hand").hide();
      $("#stone_selection").hide();
      

      if (board0.length != 0) {
	var iii = 0;
	for (var xx = 0; xx < BOARD_SIZE.WIDTH; xx++) {
          for (var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++ ) {
	    board[0][xx][yy] = board0.charAt(iii);
            iii++;
          }
	}
	//alert("board[0]saved = " + board[0]);      
      }
      player_color = player_color0;
      player_color_array[0] = player_color0;
      if (from_saved == true ) {
        kifu = gon.kifu;
        alert("kifu = " + kifu);
        var n;
        var _x;
        var _y;
        var ii;
        var temp_handd;
        var number_str;
        var invalid_flag = false;
        //alert("kifu = " + kifu);
        if (kifu.length == 0) {
        
	  //initBoard();
          //initRecord();

          //vsAI = false;
    
          //isFirst = true;
       
          //$("#a" + temp_hand).unwrap();
          last_hand = 0;
          temp_hand = 0;
          previous_temp_hand = 0;
          wrap_flag = true;
          beginning_flag = false;
          end_flag = false;
          link_flag = false;
          from_saved_first_flag = false;
	  cancel_flag = false;
          for_jump_temp_hand = 0;

          // start game
          showBoard(last_hand);
          if(!from_saved && !isFirst) {
              doAiPlayer(last_hand);
          }

        } else {	      
          i_loop:
	  for (var i = 0; i < kifu.length; i += 2) { 
            switch(kifu.charAt(i)){
              case 'a':
	      case 'A':
                n = 0;
                break;
              case 'b':
	      case 'B':
                n = 1;
                break;
              case 'c':
	      case 'C':
                n = 2;
                break;
              case 'd':
	      case 'D':
                n = 3;
                break;
              case 'e':
	      case 'E':
                n = 4;
                break;
              case 'f':
	      case 'F':
                n = 5;
                break;
              case 'g':
	      case 'G':
                n = 6;
                break;
              case 'h':
	      case 'H':
                n = 7;
                break;
	      default:
	        n = 8;
	        break;
            }
	    if (n == 8) {
	      invalid_flag = true;
	      break;
            }
            _x = n;
            _y = kifu.charAt(i + 1) - 1;
	    if (!is07Number(_y)) {
	      invalid_flag = true;
	      break;
            }
	    //alert("x = " + _x);
	    //alert("y = " + _y);
	    ii = i / 2;
	    for (var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++) {
              for (var xx = 0; xx < BOARD_SIZE.WIDTH; xx++ ) {
                board[ii + 1][xx][yy] = board[ii][xx][yy];
              }
            }
            if (turnOverBlock(ii + 1, _x, _y, true) > 0) {
              board[ii + 1][_x][_y] = player_color;
              //if (isPass(ii + 1) == false) {
              //  player_color_array[ii + 1] = BLOCK_KIND.MAX - player_color;
              //} else {
              //  player_color_array[ii + 1] = player_color;
              //}
	      previous_temp_hand = ii;
	      ii++;
                
              temp_handd = ii;
	      last_hand = temp_handd;
	
              if (temp_handd < 10) {
	        number_str = " " + temp_handd;
              } else {
	        number_str = temp_handd;
	      }
	      if (player_color == BLOCK_KIND.BLACK) {
	        display_kifu[temp_handd] = number_str + ": " + Alphabet[_x];
	      } else if (player_color == BLOCK_KIND.WHITE) {
	        display_kifu[temp_handd] = number_str + ": " + alphabet[_x];
	      }
              display_kifu[temp_handd] = display_kifu[temp_handd] + (_y + 1).toString(); 
              //showBoard(ii);
	      changePlayer(ii);

      
              temp_hand = last_hand;
	      for_jump_temp_hand = 0;
              wrap_flag = true;
	      beginning_flag = false;
	      end_flag = false;
	      link_flag = false;
              if (temp_hand == 1) {
	        from_saved_first_flag = true;
              } else {
	        from_saved_first_flag = false;
	      }
	      cancel_flag = false;
              showBoard(last_hand);
              if(!from_saved && !isFirst) {
                doAiPlayer(last_hand);
              }



	    } else {
	      //alert((temp_handd + 1) + "手目が不正です。hasamenai ");
              invalid_flag = true;
	      break i_loop;
	    }	 
          }
          if (invalid_flag == true ) {
            alert((temp_handd + 1) +  "手目が不正です。switch");
          }
        } 
      } else if (from_saved == false) {
               
        last_hand = 0;
        temp_hand = 0;
        previous_temp_hand = 0;
        wrap_flag = true;
        beginning_flag = false;
        end_flag = false;
        link_flag = false;
        from_saved_first_flag = false;
	cancel_flag = false;
        for_jump_temp_hand = 0;

        showBoard(last_hand);
        if(!from_saved && !isFirst) {
          doAiPlayer(last_hand);
        }
      
      }
    }
  };

  function is07Number(val){
    var regexp = new RegExp(/^[0-7]$/);
    return regexp.test(val);
  }

  document.getElementById("Reset").onclick = function() {
    
    // initialize board
    initBoard();
    //initRecord();

    if(document.form1.Computer.checked) {
      vsAI = true;
    } else {
      vsAI = false;
    }
    
    if(document.form1.First.checked) {
      isFirst = true;
      your_move = "first";
    } else {
      isFirst = false;
      your_move = "second";
    }
       
    from_saved = false;
    //alert("temp_hand = " + temp_hand);
    $("#a" + temp_hand).unwrap();
    last_hand = 0;
    temp_hand = 0;
    previous_temp_hand = 0;
    wrap_flag = true;
    beginning_flag = false;
    end_flag = false;
    link_flag = false;
    from_saved_first_flag = false;
    cancel_flag = false;
    for_jump_temp_hand = 0;

    // start game
    showBoard(last_hand);
    if(!from_saved && !isFirst) {
        doAiPlayer(last_hand);
    }

  };

  /*var kifu1 = $('.title').text();*/
  $("#Save").click(function() {
    /*$('.title').css('color', 'red');*/
    /*$('#result').load('/save_game_record/update');*/
    game_record_id = gon.game_record_id;
    alert(game_record_id);
    if (last_hand == 0) {
      kifu = "";
    }
    $.ajax({
      url: '/save_game_record/update',
      type: "GET",
      dataType: "html",
      async: true,
      data: {
	game_record_id: game_record_id,
        kifu: kifu,
	your_move: your_move,
	vsAI: vsAI,
	initial_board: board[0],
	player_color0: player_color_array[0],
      },
      success: function(data) {
        alert("success");
      },
      error: function(data) {
        alert("errror");
      }
    });
  });

  $("#SaveAs").click(function() {
    if (last_hand == 0) {
      kifu = "";
    }
    $.ajax({
      url: '/save_as_game_record/update',
      type: "GET",
      dataType: "html",
      async: true,
      data: {
	title: gon.title,
	black_player: gon.black_player,
	white_player: gon.white_player,
	date_played: gon.date_played,
	place_played: gon.place_played,
	user_id: gon.user_id,
	kifu: kifu,
	your_move: your_move,
	vsAI: vsAI,
        initial_board: board[0],
	player_color0: player_color_array[0],
      },
      success: function(data) {
        alert("success");
      },
      error: function(data) {
        alert("errror");
      }
    });
  });

  $("#next_button").click(function() {
    
    beginning_flag = false;
    end_flag = false;
    link_flag = false;
    from_saved_first_flag = false;
    cancel_flag = false;
    previous_temp_hand = temp_hand;
    temp_hand++;
    if (temp_hand <= last_hand) {
      changePlayer(temp_hand);
      wrap_flag = true;
    } else {
      temp_hand = last_hand;
      wrap_flag = false;
    }
    showBoard(temp_hand);
  });
  
  $("#previous_button").click(function() {
    beginning_flag = false;
    end_flag = false;
    link_flag = false;
    from_saved_first_flag = false;
    cancel_flag = false;
    previous_temp_hand = temp_hand;
    temp_hand--;
    if (temp_hand >= 0) {
      changePlayer(temp_hand);
      wrap_flag = true;
    } else {
      temp_hand = 0;
      wrap_flag = false;
    }
    showBoard(temp_hand);
  });

  $("#back_to_beginning").click(function() {
    if (temp_hand != 0) {
      wrap_flag = true;
    } else {
      wrap_flag = false;
    }
    beginning_flag = true;
    end_flag = false;
    link_flag = false;
    from_saved_first_flag = false;
    cancel_flag = false;
    for_jump_temp_hand = temp_hand;
    temp_hand = 0;
    player_color = BLOCK_KIND.BLACK;
    showBoard(0);
  });

  $("#go_to_end").click(function() {
    if (temp_hand != last_hand) {
      wrap_flag = true;
    } else {
      wrap_flag = false;
    }
    end_flag = true;
    beginning_flag = false;
    link_flag = false;
    from_saved_first_flag = false;
    cancel_flag = false;
    for_jump_temp_hand = temp_hand;
    temp_hand = last_hand;
    player_color = player_color_array[last_hand];
    showBoard(last_hand);
  });

  for (var i = 0; i <= 64; i++) {
    $("#a" + i).on("click", {value: i}, function(event) {
      wrap_flag = true;
      beginning_flag = false;
      end_flag = false;
      link_flag = true;
      from_saved_first_flag = false;
      cancel_flag = false;
      for_jump_temp_hand = temp_hand;
      temp_hand = event.data.value;
      if(temp_hand != for_jump_temp_hand) {
	wrap_flag = true;
      } else {
	wrap_flag = false;
      }
      player_color = player_color_array[temp_hand];
      showBoard(temp_hand);
    });
  }

  $("#edit_board_ok").click(function() {
    $("#edit_board_ok").hide();
    $("#edit_board_cancel").hide();
    $("#next_hand_text").hide();
    $("#stone_selection_text").hide();
    $("#msg_kifu").show();
    $("#simple_kifu").show();
    
    if(document.form1.Computer.checked) {
      vsAI = true;
    } else {
      vsAI = false;
    }
    
    if(document.form1.First.checked) {
      isFirst = true;
      your_move = "first";
    } else {
      isFirst = false;
      your_move = "second";
    }
    alert("your_move = " + your_move);
    alert("vsAI = " + vsAI);
  
    
//    for (var i = 0; i < BOARD_SIZE.HEIGHT+1; i++) {
//      saved_board[i] = [];
//      for (var j = 0; j < BOARD_SIZE.WIDTH+1; j++) {
//        saved_board[i][j] = BLOCK_KIND.NONE;
//      }
//    }

//    for (var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++) {
//      for (var xx = 0; xx < BOARD_SIZE.WIDTH; xx++ ) {
//        saved_board[xx][yy] = board[0][xx][yy];
//      }
//    }




    from_saved = false;
    //alert("temp_hand = " + temp_hand);
    $("#a" + temp_hand).unwrap();
    last_hand = 0;
    temp_hand = 0;
    previous_temp_hand = 0;
    wrap_flag = true;
    beginning_flag = false;
    end_flag = false;
    link_flag = false;
    from_saved_first_flag = false;
    cancel_flag = false;
    for_jump_temp_hand = 0;
    edit_board = false;
    
	  
    $("#next_hand").children().remove();
    $("#stone_selection").children().remove();
    black_next_yellow_frame_length = 0;
    white_next_yellow_frame_length = 0;
    black_select_yellow_frame_length = 0;
    white_select_yellow_frame_length = 0;
    none_select_yellow_frame_length = 0;   



    //$("#next_hand").hide();
    //$("#stone_selection").hide();
 
    // start game
    showBoard(last_hand);
    if(!from_saved && !isFirst) {
      doAiPlayer(last_hand);
    }
  });

  $("#edit_board_cancel").click(function() {
    $("#edit_board_ok").hide();
    $("#edit_board_cancel").hide();
    $("#next_hand_text").hide();
    $("#stone_selection_text").hide();
    $("#msg_kifu").show();
    $("#simple_kifu").show();

    if (edit_board == false) {	  
      vsAI = saved_vsAI;
      isFirst = saved_isFirst;
      your_move = saved_your_move;
      alert("your_move = " + your_move);
      alert("vsAI = " + vsAI);
      alert("edit_board = " + edit_board);
      from_saved = saved_from_saved;
      //alert("temp_hand = " + temp_hand);

      last_hand = saved_last_hand;
      temp_hand = saved_temp_hand;
      //alert("saved_temp_hand = " + saved_temp_hand);
      alert("temp_hand = " + temp_hand);
      //$("#a" + temp_hand).unwrap();
      previous_temp_hand = saved_previous_temp_hand;
      //alert("previout_temp_hand = " + previous_temp_hand);
      wrap_flag = false;
      //alert("wrap_flag = " + wrap_flag);
      beginning_flag = saved_beginning_flag;
      //alert("beginning_flag = " + beginning_flag);
      end_flag = saved_end_flag;
      //alert("end_flag = " + end_flag);
      link_flag = saved_link_flag;
      //alert("link_flag = " + link_flag);
      from_saved_first_flag = saved_from_saved_first_flag;
      //alert("from_saved_first_flag = " + from_saved_first_flag);
      for_jump_temp_hand = saved_for_jump_temp_hand;

      cancel_flag = true;	  
      edit_board = false;

      // initial position
      for (var i = 0; i < BOARD_SIZE.HEIGHT+1; i++) {
        for (var j = 0; j < BOARD_SIZE.WIDTH+1; j++) {
          board[0][i][j] = saved_board[i][j];
        }
      }

      //alert("koko kitenai");

      $("#next_hand").children().remove();
      $("#stone_selection").children().remove();
      //$("#next_hand").hide();
      //$("#stone_selection").hide();
      black_next_yellow_frame_length = 0;
      white_next_yellow_frame_length = 0;
      black_select_yellow_frame_length = 0;
      white_select_yellow_frame_length = 0;
      none_select_yellow_frame_length = 0;     
 

      // start game
      showBoard(temp_hand);
      //alert("board[0](edit_board_ok) = " + board[0]);
      if(!from_saved && !isFirst) {
        doAiPlayer(temp_hand);
      }          

    } else if (edit_board == true) {
      alert("edit_board = " + edit_board);
      // initialize board
      initBoard();
      //initRecord();
      /*     
      if(document.form1.Computer.checked) {
        vsAI = true;
      } else {
        vsAI = false;
      }

      if(document.form1.First.checked) {
        isFirst = true;
        your_move = "first";
      } else {
        isFirst = false;
        your_move = "second";
      }
      */ 
      from_saved = false;
      //alert("temp_hand = " + temp_hand);
      //$("#a" + temp_hand).unwrap();
      last_hand = 0;
      temp_hand = 0;
      //$("#a" + temp_hand).unwrap();
      previous_temp_hand = 0;
      wrap_flag = true;
      beginning_flag = false;
      end_flag = false;
      link_flag = false;
      from_saved_first_flag = false;
      cancel_flag = true;
      for_jump_temp_hand = 0;

      $("#next_hand").children().remove();
      $("#stone_selection").children().remove();
      $("#next_hand").hide();
      $("#stone_selection").hide();
      black_next_yellow_frame_length = 0;
      white_next_yellow_frame_length = 0;
      black_select_yellow_frame_length = 0;
      white_select_yellow_frame_length = 0;
      none_select_yellow_frame_length = 0;


      // start game
      showBoard(last_hand);
      if(!from_saved && !isFirst) {
        doAiPlayer(last_hand);
      }  
    }

  

/*
    if (!(beginning_flag == true || end_flag == true || link_flag == true)) {
      if (temp_hand == previous_temp_hand + 1 || temp_hand == previous_temp_hand - 1) {
        if (from_saved_first_flag == false) {
          $("#a" + previous_temp_hand).unwrap();
        }
      }
    }
*/

    // start game
    //showBoard(temp_hand);
    //alert("board[0](edit_board_ok) = " + board[0]);
    //if(!from_saved && !isFirst) {
    //  doAiPlayer(temp_hand);
    //}
 



  });


  $("#EditBoard").click(function() {
    $("#next_hand_text").show();
    $("#stone_selection_text").show();
    $("#next_hand").show();
    $("#stone_selection").show();
    $("#edit_board_ok").show();
    $("#edit_board_cancel").show();
    
    for (var i = 0; i < BOARD_SIZE.HEIGHT+1; i++) {
      saved_board[i] = [];
      for (var j = 0; j < BOARD_SIZE.WIDTH+1; j++) {
        saved_board[i][j] = BLOCK_KIND.NONE;
      }
    }

    for (var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++) {
      for (var xx = 0; xx < BOARD_SIZE.WIDTH; xx++ ) {
        saved_board[xx][yy] = board[0][xx][yy];
      }
    }
	  
    for (var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++) {
      for (var xx = 0; xx < BOARD_SIZE.WIDTH; xx++ ) {
        board[0][xx][yy] = board[temp_hand][xx][yy];
      }
    }

    saved_vsAI = vsAI
    saved_isFirst = isFirst;
    saved_your_move = your_move;
    saved_from_saved = from_saved;

    saved_temp_hand = temp_hand;
    saved_last_hand = last_hand;
    saved_previous_temp_hand = previous_temp_hand;
    saved_wrap_flag = wrap_flag;
    saved_beginning_flag = beginning_flag;
    saved_end_flag = end_flag;
    saved_link_flag = link_flag;
    saved_from_saved_first_flag = from_saved_first_flag;
    saved_for_jump_temp_hand = for_jump_temp_hand;
    

    edit_board = false;
    edit_flag = true;
    doEditBoard();
  });

  $("#save_comment").click(function() {
    game_record_id = gon.game_record_id;
    alert(game_record_id);
    alert("save_comment");
    var str1 = $('textarea[name="test1"]').val();
    alert(str1);
    comment[temp_hand] = str1;
    alert(comment[temp_hand]);
    $.ajax({
      url: '/save_commnet/update',
      type: "GET",
      dataType: "html",
      async: true,
      data: {
        game_record_id: game_record_id,
        temp_hand: temp_hand,
	comment: comment[temp_hand],
      },
      success: function(data) {
        alert("success");
      },
      error: function(data) {
        alert("errror");
      }
    });


  });



})();

/*
$(function(){
  $('.title').css('color', 'red');
});
*/
