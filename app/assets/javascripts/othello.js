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
  var stone_black_yellow_frame_length = 0;
  var stone_white_yellow_frame_length = 0;

  var saved_board = [];
  var saved_player_color;
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
  var normalized_kifu_x = [];
  var normalized_kifu_y = [];
  var normalized_board0 = [];
  var transform_saved_temp_hand;

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
  var hand_flag;

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
    /*
    if (edit_board == false) {
      saved_vsAI = vsAI;
      saved_isFirst = isFirst;
      saved_your_move = your_move;
      saved_from_saved = from_saved;

      saved_last_hand = last_hand;
      saved_temp_hand = temp_hand;
      saved_previous_temp_hand = previous_temp_hand;
      saved_beginning_flag = beginning_flag;
      saved_end_flag = end_flag;
      saved_link_flag = link_flag;
      saved_from_saved_first_flag = from_saved_first_flag;
      saved_for_jump_temp_hand = for_jump_temp_hand;
    }
    */
    var b = document.getElementById("board");
	  
    while(b.firstChild) {
      b.removeChild(b.firstChild);
    }

    
    var c = document.getElementById("next_hand_frame");


    var d = document.getElementById("stone_selection_frame");


    var c1 = document.getElementById("next_hand");


    var d1 = document.getElementById("stone_selection");


    var e = document.getElementById("your_stone_color_frame");

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

     
    
    //show next hand

    var black_stone_next_hand =  stone[BLOCK_KIND.BLACK].cloneNode(true);

    black_stone_next_hand.style.left = 1 * CELL_WIDTH + "px";
    black_stone_next_hand.style.top = 0 * CELL_WIDTH +"px";	      
    c1.appendChild(black_stone_next_hand);
     
    var white_stone_next_hand =  stone[BLOCK_KIND.WHITE].cloneNode(true);

    white_stone_next_hand.style.left = 2 * CELL_WIDTH + "px";
    white_stone_next_hand.style.top = 0 * CELL_WIDTH + "px";
    c1.appendChild(white_stone_next_hand);
        
    //  show black_next yellow_frame corner

    var black_next_yellow_frame_top_left_corner = black_next_yellow_frame_corner.cloneNode(true);
    
    black_next_yellow_frame_top_left_corner.style.left = 1 * CELL_WIDTH + "px";
    black_next_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
       	
    var black_next_yellow_frame_top_right_corner = black_next_yellow_frame_corner.cloneNode(true);

    black_next_yellow_frame_top_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    black_next_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //c.appendChild(black_next_yellow_frame_top_right_corner);

    var black_next_yellow_frame_bottom_left_corner = black_next_yellow_frame_corner.cloneNode(true);

    black_next_yellow_frame_bottom_left_corner.style.left = 1 * CELL_WIDTH + "px";
    black_next_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //c.appendChild(black_next_yellow_frame_bottom_left_corner);

    var black_next_yellow_frame_bottom_right_corner = black_next_yellow_frame_corner.cloneNode(true);

    black_next_yellow_frame_bottom_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    black_next_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //c.appendChild(black_next_yellow_frame_bottom_right_corner);
    
    // show black_next yellow_frame frame

    var black_next_yellow_frame_top_side_frame = black_next_yellow_frame_side_frame.cloneNode(true);

    black_next_yellow_frame_top_side_frame.style.left = 1 * CELL_WIDTH + "px";
    black_next_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(black_next_yellow_frame_top_side_frame);


    var black_next_yellow_frame_bottom_side_frame = black_next_yellow_frame_side_frame.cloneNode(true);

    black_next_yellow_frame_bottom_side_frame.style.left = 1 * CELL_WIDTH + "px";
    black_next_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(black_next_yellow_frame_bottom_side_frame);

	      
    var black_next_yellow_frame_left_vertical_frame = black_next_yellow_frame_vertical_frame.cloneNode(true);

    black_next_yellow_frame_left_vertical_frame.style.left = 1 * CELL_WIDTH  + "px";
    black_next_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(black_next_yellow_frame_left_vertical_frame);


    var black_next_yellow_frame_right_vertical_frame = black_next_yellow_frame_vertical_frame.cloneNode(true);

    black_next_yellow_frame_right_vertical_frame.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    black_next_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
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

    white_next_yellow_frame_top_left_corner.style.left = 2 * CELL_WIDTH + "px";
    white_next_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_next_yellow_frame_top_left_corner);

    var white_next_yellow_frame_top_right_corner = white_next_yellow_frame_corner.cloneNode(true);

    white_next_yellow_frame_top_right_corner.style.left = 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
    white_next_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_next_yellow_frame_top_right_corner);

    var white_next_yellow_frame_bottom_left_corner = white_next_yellow_frame_corner.cloneNode(true);

    white_next_yellow_frame_bottom_left_corner.style.left = 2 * CELL_WIDTH + "px";
    white_next_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(white_next_yellow_frame_bottom_left_corner);

    var white_next_yellow_frame_bottom_right_corner = white_next_yellow_frame_corner.cloneNode(true);

    white_next_yellow_frame_bottom_right_corner.style.left = 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
    white_next_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(white_next_yellow_frame_bottom_right_corner);

    // show white_next yellow_frame frame

    var white_next_yellow_frame_top_side_frame = white_next_yellow_frame_side_frame.cloneNode(true);

    white_next_yellow_frame_top_side_frame.style.left = 2 * CELL_WIDTH + "px";
    white_next_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_next_yellow_frame_top_side_frame);


    var white_next_yellow_frame_bottom_side_frame = white_next_yellow_frame_side_frame.cloneNode(true);

    white_next_yellow_frame_bottom_side_frame.style.left = 2 * CELL_WIDTH + "px";
    white_next_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(white_next_yellow_frame_bottom_side_frame);


    var white_next_yellow_frame_left_vertical_frame = white_next_yellow_frame_vertical_frame.cloneNode(true);

    white_next_yellow_frame_left_vertical_frame.style.left = 2 * CELL_WIDTH  + "px";
    white_next_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_next_yellow_frame_left_vertical_frame);


    var white_next_yellow_frame_right_vertical_frame = white_next_yellow_frame_vertical_frame.cloneNode(true);

    white_next_yellow_frame_right_vertical_frame.style.left = 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
    white_next_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_next_yellow_frame_right_vertical_frame);


    // show stone choice cell

    var black_stone_choice =  stone[BLOCK_KIND.BLACK].cloneNode(true);

    black_stone_choice.style.left = 0 * CELL_WIDTH + "px";
    black_stone_choice.style.top = 0 * CELL_WIDTH + "px";
    d1.appendChild(black_stone_choice);

    var white_stone_choice = stone[BLOCK_KIND.WHITE].cloneNode(true);

    white_stone_choice.style.left = 1 * CELL_WIDTH + "px";
    white_stone_choice.style.top = 0 * CELL_WIDTH + "px";
    d1.appendChild(white_stone_choice);

    var none_stone_choice =  stone[BLOCK_KIND.NONE].cloneNode(true);

    none_stone_choice.style.left = 2 * CELL_WIDTH + "px";
    none_stone_choice.style.top = 0 * CELL_WIDTH + "px";
    d1.appendChild(none_stone_choice);

    //  show black_select yellow_frame corner

    var black_select_yellow_frame_top_left_corner = black_select_yellow_frame_corner.cloneNode(true);

    black_select_yellow_frame_top_left_corner.style.left = 0 * CELL_WIDTH + "px";
    black_select_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
        
    var black_select_yellow_frame_top_right_corner = black_select_yellow_frame_corner.cloneNode(true);

    black_select_yellow_frame_top_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    black_select_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //d.appendChild(black_select_yellow_frame_top_right_corner);

    var black_select_yellow_frame_bottom_left_corner = black_select_yellow_frame_corner.cloneNode(true);

    black_select_yellow_frame_bottom_left_corner.style.left = 0 * CELL_WIDTH + "px";
    black_select_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //d.appendChild(black_select_yellow_frame_bottom_left_corner);

    var black_select_yellow_frame_bottom_right_corner = black_select_yellow_frame_corner.cloneNode(true);

    black_select_yellow_frame_bottom_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    black_select_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //d.appendChild(black_select_yellow_frame_bottom_right_corner);

    // show black_select yellow_frame frame

    var black_select_yellow_frame_top_side_frame = black_select_yellow_frame_side_frame.cloneNode(true);

    black_select_yellow_frame_top_side_frame.style.left = 0 * CELL_WIDTH + "px";
    black_select_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(black_select_yellow_frame_top_side_frame);


    var black_select_yellow_frame_bottom_side_frame = black_select_yellow_frame_side_frame.cloneNode(true);

    black_select_yellow_frame_bottom_side_frame.style.left = 0 * CELL_WIDTH + "px";
    black_select_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(black_select_yellow_frame_bottom_side_frame);


    var black_select_yellow_frame_left_vertical_frame = black_select_yellow_frame_vertical_frame.cloneNode(true);

    black_select_yellow_frame_left_vertical_frame.style.left = 0 * CELL_WIDTH  + "px";
    black_select_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(black_select_yellow_frame_left_vertical_frame);


    var black_select_yellow_frame_right_vertical_frame = black_select_yellow_frame_vertical_frame.cloneNode(true);

    black_select_yellow_frame_right_vertical_frame.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    black_select_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
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

    white_select_yellow_frame_top_left_corner.style.left = 1 * CELL_WIDTH + "px";
    white_select_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_select_yellow_frame_top_left_corner);

    var white_select_yellow_frame_top_right_corner = white_select_yellow_frame_corner.cloneNode(true);

    white_select_yellow_frame_top_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    white_select_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_select_yellow_frame_top_right_corner);

    var white_select_yellow_frame_bottom_left_corner = white_select_yellow_frame_corner.cloneNode(true);

    white_select_yellow_frame_bottom_left_corner.style.left = 1 * CELL_WIDTH + "px";
    white_select_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(white_select_yellow_frame_bottom_left_corner);

    var white_select_yellow_frame_bottom_right_corner = white_select_yellow_frame_corner.cloneNode(true);

    white_select_yellow_frame_bottom_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    white_select_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(white_select_yellow_frame_bottom_right_corner);

    // show white_select yellow_frame frame

    var white_select_yellow_frame_top_side_frame = white_select_yellow_frame_side_frame.cloneNode(true);

    white_select_yellow_frame_top_side_frame.style.left = 1 * CELL_WIDTH + "px";
    white_select_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_select_yellow_frame_top_side_frame);


    var white_select_yellow_frame_bottom_side_frame = white_select_yellow_frame_side_frame.cloneNode(true);

    white_select_yellow_frame_bottom_side_frame.style.left = 1 * CELL_WIDTH + "px";
    white_select_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(white_select_yellow_frame_bottom_side_frame);


    var white_select_yellow_frame_left_vertical_frame = white_select_yellow_frame_vertical_frame.cloneNode(true);

    white_select_yellow_frame_left_vertical_frame.style.left = 1 * CELL_WIDTH  + "px";
    white_select_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_select_yellow_frame_left_vertical_frame);


    var white_select_yellow_frame_right_vertical_frame = white_select_yellow_frame_vertical_frame.cloneNode(true);

    white_select_yellow_frame_right_vertical_frame.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    white_select_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(white_select_yellow_frame_right_vertical_frame);

    //  show none_select yellow_frame corner

    var none_select_yellow_frame_top_left_corner = none_select_yellow_frame_corner.cloneNode(true);

    none_select_yellow_frame_top_left_corner.style.left = 2 * CELL_WIDTH + "px";
    none_select_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(none_select_yellow_frame_top_left_corner);

    var none_select_yellow_frame_top_right_corner = none_select_yellow_frame_corner.cloneNode(true);

    none_select_yellow_frame_top_right_corner.style.left = 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
    none_select_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(none_select_yellow_frame_top_right_corner);

    var none_select_yellow_frame_bottom_left_corner = none_select_yellow_frame_corner.cloneNode(true);

    none_select_yellow_frame_bottom_left_corner.style.left = 2 * CELL_WIDTH + "px";
    none_select_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(none_select_yellow_frame_bottom_left_corner);

    var none_select_yellow_frame_bottom_right_corner = none_select_yellow_frame_corner.cloneNode(true);

    none_select_yellow_frame_bottom_right_corner.style.left = 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
    none_select_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(none_select_yellow_frame_bottom_right_corner);

    // show none_select yellow_frame frame

    var none_select_yellow_frame_top_side_frame = none_select_yellow_frame_side_frame.cloneNode(true);

    none_select_yellow_frame_top_side_frame.style.left = 2 * CELL_WIDTH + "px";
    none_select_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(none_select_yellow_frame_top_side_frame);


    var none_select_yellow_frame_bottom_side_frame = none_select_yellow_frame_side_frame.cloneNode(true);

    none_select_yellow_frame_bottom_side_frame.style.left = 2 * CELL_WIDTH + "px";
    none_select_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //b.appendChild(none_select_yellow_frame_bottom_side_frame);


    var none_select_yellow_frame_left_vertical_frame = none_select_yellow_frame_vertical_frame.cloneNode(true);

    none_select_yellow_frame_left_vertical_frame.style.left = 2 * CELL_WIDTH  + "px";
    none_select_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(none_select_yellow_frame_left_vertical_frame);


    var none_select_yellow_frame_right_vertical_frame = none_select_yellow_frame_vertical_frame.cloneNode(true);

    none_select_yellow_frame_right_vertical_frame.style.left = 3 * CELL_WIDTH - YELLOW_WIDTH + "px";
    none_select_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //b.appendChild(none_select_yellow_frame_right_vertical_frame);
 
    //show your stone color

    var your_stone_color_black = stone[BLOCK_KIND.BLACK].cloneNode(true);

    your_stone_color_black.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - 12 * 1.5 + "px";
    your_stone_color_black.style.top = FRAME_WIDTH + 10 * CELL_WIDTH + FRAME_WIDTH + 22 + "px";
    b.appendChild(your_stone_color_black);

    var your_stone_color_white = stone[BLOCK_KIND.WHITE].cloneNode(true);

    your_stone_color_white.style.left = FRAME_WIDTH + 3 * CELL_WIDTH - 12 * 1.5 + "px";
    your_stone_color_white.style.top = FRAME_WIDTH + 10 * CELL_WIDTH + FRAME_WIDTH + 22 + "px";
    b.appendChild(your_stone_color_white);


    //  show stone_black yellow_frame corner

    var stone_black_yellow_frame_top_left_corner = stone_black_yellow_frame_corner.cloneNode(true);
    
    stone_black_yellow_frame_top_left_corner.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_top_left_corner);

    var stone_black_yellow_frame_top_right_corner = stone_black_yellow_frame_corner.cloneNode(true);

    stone_black_yellow_frame_top_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_black_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_top_right_corner);

    var stone_black_yellow_frame_bottom_left_corner = stone_black_yellow_frame_corner.cloneNode(true);

    stone_black_yellow_frame_bottom_left_corner.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_bottom_left_corner);

    var stone_black_yellow_frame_bottom_right_corner = stone_black_yellow_frame_corner.cloneNode(true);

    stone_black_yellow_frame_bottom_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_black_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_bottom_right_corner);
    
    // show black_next yellow_frame frame

    var stone_black_yellow_frame_top_side_frame = stone_black_yellow_frame_side_frame.cloneNode(true);

    stone_black_yellow_frame_top_side_frame.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_top_side_frame);


    var stone_black_yellow_frame_bottom_side_frame = stone_black_yellow_frame_side_frame.cloneNode(true);

    stone_black_yellow_frame_bottom_side_frame.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_bottom_side_frame);

	      
    var stone_black_yellow_frame_left_vertical_frame = stone_black_yellow_frame_vertical_frame.cloneNode(true);

    stone_black_yellow_frame_left_vertical_frame.style.left = 0 * CELL_WIDTH  + "px";
    stone_black_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_left_vertical_frame);


    var stone_black_yellow_frame_right_vertical_frame = stone_black_yellow_frame_vertical_frame.cloneNode(true);

    stone_black_yellow_frame_right_vertical_frame.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_black_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_right_vertical_frame);
/*
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
*/    

    //  show stone_white yellow_frame corner

    var stone_white_yellow_frame_top_left_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_top_left_corner.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_top_left_corner);

    var stone_white_yellow_frame_top_right_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_top_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_white_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_top_right_corner);

    var stone_white_yellow_frame_bottom_left_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_bottom_left_corner.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_bottom_left_corner);

    var stone_white_yellow_frame_bottom_right_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_bottom_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_white_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_bottom_right_corner);

    // show stone_white yellow_frame frame

    var stone_white_yellow_frame_top_side_frame = stone_white_yellow_frame_side_frame.cloneNode(true);

    stone_white_yellow_frame_top_side_frame.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_top_side_frame);


    var stone_white_yellow_frame_bottom_side_frame = stone_white_yellow_frame_side_frame.cloneNode(true);

    stone_white_yellow_frame_bottom_side_frame.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_bottom_side_frame);


    var stone_white_yellow_frame_left_vertical_frame = stone_white_yellow_frame_vertical_frame.cloneNode(true);

    stone_white_yellow_frame_left_vertical_frame.style.left = 1 * CELL_WIDTH  + "px";
    stone_white_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_left_vertical_frame);


    var stone_white_yellow_frame_right_vertical_frame = stone_white_yellow_frame_vertical_frame.cloneNode(true);

    stone_white_yellow_frame_right_vertical_frame.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_white_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_right_vertical_frame);


    // show cell

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        
	var cell = stone[board[0][x][y]].cloneNode(true);
                
        cell.style.left = FRAME_WIDTH + (x * CELL_WIDTH) + "px"; 
        cell.style.top = FRAME_WIDTH + (y * CELL_WIDTH) + "px"; 
        b.appendChild(cell);

    // show dot        
        if (y == BOARD_SIZE.HEIGHT - 1  && x == BOARD_SIZE.WIDTH - 1) {
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

        }
	      
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
	  

	  your_stone_color_black.onclick = function() {
            if (stone_black_yellow_frame_length == 0) {
	      while(e.firstChild) {
                e.removeChild(e.firstChild);
              }
	      stone_white_yellow_frame_length = 0;
	      e.appendChild(stone_black_yellow_frame_top_left_corner);
              e.appendChild(stone_black_yellow_frame_top_right_corner);
              e.appendChild(stone_black_yellow_frame_bottom_left_corner);
              e.appendChild(stone_black_yellow_frame_bottom_right_corner);
              e.appendChild(stone_black_yellow_frame_top_side_frame);
              e.appendChild(stone_black_yellow_frame_bottom_side_frame);
              e.appendChild(stone_black_yellow_frame_left_vertical_frame);
              e.appendChild(stone_black_yellow_frame_right_vertical_frame);
              stone_black_yellow_frame_length = 1;
	    }
          };
        
	  your_stone_color_white.onclick = function() {
	    if (stone_white_yellow_frame_length == 0) {
              while(e.firstChild) {
              e.removeChild(e.firstChild);
              }
              stone_black_yellow_frame_length = 0;
              e.appendChild(stone_white_yellow_frame_top_left_corner);
              e.appendChild(stone_white_yellow_frame_top_right_corner);
              e.appendChild(stone_white_yellow_frame_bottom_left_corner);
              e.appendChild(stone_white_yellow_frame_bottom_right_corner);
              e.appendChild(stone_white_yellow_frame_top_side_frame);
              e.appendChild(stone_white_yellow_frame_bottom_side_frame);
              e.appendChild(stone_white_yellow_frame_left_vertical_frame);
              e.appendChild(stone_white_yellow_frame_right_vertical_frame);
              stone_white_yellow_frame_length = 1;
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

    var e = document.getElementById("your_stone_color_frame");

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

    //show your stone color

    var your_stone_color_black = stone[BLOCK_KIND.BLACK].cloneNode(true);

    your_stone_color_black.style.left = FRAME_WIDTH + 2 * CELL_WIDTH - 12 * 1.5 + "px";
    your_stone_color_black.style.top = FRAME_WIDTH + 10 * CELL_WIDTH + FRAME_WIDTH + 22 + "px";	      
    b.appendChild(your_stone_color_black);

    var your_stone_color_white = stone[BLOCK_KIND.WHITE].cloneNode(true);

    your_stone_color_white.style.left = FRAME_WIDTH + 3 * CELL_WIDTH - 12 * 1.5 + "px";
    your_stone_color_white.style.top = FRAME_WIDTH + 10 * CELL_WIDTH + FRAME_WIDTH + 22 + "px";
    b.appendChild(your_stone_color_white);

    //  show stone_black yellow_frame corner

    var stone_black_yellow_frame_top_left_corner = stone_black_yellow_frame_corner.cloneNode(true);
    
    stone_black_yellow_frame_top_left_corner.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_top_left_corner);

    var stone_black_yellow_frame_top_right_corner = stone_black_yellow_frame_corner.cloneNode(true);

    stone_black_yellow_frame_top_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_black_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_top_right_corner);

    var stone_black_yellow_frame_bottom_left_corner = stone_black_yellow_frame_corner.cloneNode(true);

    stone_black_yellow_frame_bottom_left_corner.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_bottom_left_corner);

    var stone_black_yellow_frame_bottom_right_corner = stone_black_yellow_frame_corner.cloneNode(true);

    stone_black_yellow_frame_bottom_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_black_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_bottom_right_corner);
    
    // show black_next yellow_frame frame

    var stone_black_yellow_frame_top_side_frame = stone_black_yellow_frame_side_frame.cloneNode(true);

    stone_black_yellow_frame_top_side_frame.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_top_side_frame);


    var stone_black_yellow_frame_bottom_side_frame = stone_black_yellow_frame_side_frame.cloneNode(true);

    stone_black_yellow_frame_bottom_side_frame.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_bottom_side_frame);

	      
    var stone_black_yellow_frame_left_vertical_frame = stone_black_yellow_frame_vertical_frame.cloneNode(true);

    stone_black_yellow_frame_left_vertical_frame.style.left = 0 * CELL_WIDTH  + "px";
    stone_black_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_left_vertical_frame);


    var stone_black_yellow_frame_right_vertical_frame = stone_black_yellow_frame_vertical_frame.cloneNode(true);

    stone_black_yellow_frame_right_vertical_frame.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_black_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_right_vertical_frame);
/*
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
*/    

    //  show stone_white yellow_frame corner

    var stone_white_yellow_frame_top_left_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_top_left_corner.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_top_left_corner);

    var stone_white_yellow_frame_top_right_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_top_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_white_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_top_right_corner);

    var stone_white_yellow_frame_bottom_left_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_bottom_left_corner.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_bottom_left_corner);

    var stone_white_yellow_frame_bottom_right_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_bottom_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_white_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_bottom_right_corner);

    // show stone_white yellow_frame frame

    var stone_white_yellow_frame_top_side_frame = stone_white_yellow_frame_side_frame.cloneNode(true);

    stone_white_yellow_frame_top_side_frame.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_top_side_frame);


    var stone_white_yellow_frame_bottom_side_frame = stone_white_yellow_frame_side_frame.cloneNode(true);

    stone_white_yellow_frame_bottom_side_frame.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_bottom_side_frame);


    var stone_white_yellow_frame_left_vertical_frame = stone_white_yellow_frame_vertical_frame.cloneNode(true);

    stone_white_yellow_frame_left_vertical_frame.style.left = 1 * CELL_WIDTH  + "px";
    stone_white_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_left_vertical_frame);


    var stone_white_yellow_frame_right_vertical_frame = stone_white_yellow_frame_vertical_frame.cloneNode(true);

    stone_white_yellow_frame_right_vertical_frame.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_white_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_right_vertical_frame);

    
    // show cell

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        
	var cell = stone[board[i][x][y]].cloneNode(true);
                
        cell.style.left = FRAME_WIDTH + (x * CELL_WIDTH) + "px"; 
        cell.style.top = FRAME_WIDTH + (y * CELL_WIDTH) + "px"; 
        b.appendChild(cell);

     // show dot
	if (y == BOARD_SIZE.HEIGHT - 1  && x == BOARD_SIZE.WIDTH - 1) {
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
        }

  
        (function() {
          var _x = x;
          var _y = y;
         
          your_stone_color_black.onclick = function() {
            if (stone_black_yellow_frame_length == 0) {
	      while(e.firstChild) {
                e.removeChild(e.firstChild);
              }
	      stone_white_yellow_frame_length = 0;
	      e.appendChild(stone_black_yellow_frame_top_left_corner);
              e.appendChild(stone_black_yellow_frame_top_right_corner);
              e.appendChild(stone_black_yellow_frame_bottom_left_corner);
              e.appendChild(stone_black_yellow_frame_bottom_right_corner);
              e.appendChild(stone_black_yellow_frame_top_side_frame);
              e.appendChild(stone_black_yellow_frame_bottom_side_frame);
              e.appendChild(stone_black_yellow_frame_left_vertical_frame);
              e.appendChild(stone_black_yellow_frame_right_vertical_frame);
              stone_black_yellow_frame_length = 1;
	    }
          };
        
	  your_stone_color_white.onclick = function() {
	    if (stone_white_yellow_frame_length == 0) {
              while(e.firstChild) {
              e.removeChild(e.firstChild);
              }
              stone_black_yellow_frame_length = 0;
              e.appendChild(stone_white_yellow_frame_top_left_corner);
              e.appendChild(stone_white_yellow_frame_top_right_corner);
              e.appendChild(stone_white_yellow_frame_bottom_left_corner);
              e.appendChild(stone_white_yellow_frame_bottom_right_corner);
              e.appendChild(stone_white_yellow_frame_top_side_frame);
              e.appendChild(stone_white_yellow_frame_bottom_side_frame);
              e.appendChild(stone_white_yellow_frame_left_vertical_frame);
              e.appendChild(stone_white_yellow_frame_right_vertical_frame);
              stone_white_yellow_frame_length = 1;
            }
          };
		
		
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
	      //  player_color_array[i+1] = BLOCK_KIND.MAX - player_color;
	      //} else {
	      //  player_color_array[i+1] = player_color;
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
	      hand_flag = true;
	      //showBoard関数内
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
	  
    var $box = $($(".link").data("box"));
    var $tareget = $($(".link").attr("href"));
    var dist = $tareget.position().top - $box.position().top;
    $box.stop().animate({
      scrollTop: $box.scrollTop() + dist
    });
    
    for (var i = 0; i <= 63 ; i++) {
      if (i < temp_hand) {
        $("#text" + i).hide();
      } else if (i == temp_hand){
        $("#text" + i).show();
      } else if (temp_hand < i) {
        $("#text" + i).hide();
      }
    }

    if (i == 64) {
      if (i == temp_hand) {
	$("#text" + i).show();
      } else if (temp_hand < i) {
	$("#text" + i).hide();
      }
    }


    //alert("hand_flag = " + hand_flag);
    //alert("temp_hand = " + temp_hand);
    enclose_frame(temp_hand);


	  
    if(allBlackColor(temp_hand)) {
      alert("黒のパーフェクト勝ちです。");
      isFinished = true;
    } else if (allWhiteColor(temp_hand)) {
      alert("白のパーフェクト勝ちです。");
      isFinished = true;
    } else if (black + white == 64) {
      isFinished = true;
      if (black > white) {
        alert("黒の勝ちです。");
      } else if(white > black) {
	alert("白の勝ちです。");
　　　} else {
	alert("引き分けです。");
      }
    }
    
    if (isFinished == true) {
      $("#black_player_name").css({
        backgroundColor: "white",
        border: "none"
      });
      $("#white_player_name").css({
        backgroundColor: "white",
        border: "none"
      });
      isFinished = false;
    }	    

  };

  var enclose_frame = function(i) {
    var pass_or_not;
//    if (temp_hand == 0) {
//      pass_or_not = false;
//    }
    if(temp_hand >= 0) {
      player_color = BLOCK_KIND.MAX - player_color;
      pass_or_not = isPass(i) && !isFinish(i) && !allSameColor(i);
      player_color = BLOCK_KIND.MAX - player_color;
    }
	  
    if ((pass_or_not) || (hand_flag == false || (hand_flag == true && temp_hand == 0))) {
      if (player_color == BLOCK_KIND.BLACK) {	  
        $("#black_player_name").css({
          backgroundColor: "gainsboro",
          border: "3px solid",
          borderColor: "yellow"
        });
      } else if (player_color == BLOCK_KIND.WHITE) {
        $("#black_player_name").css({
          backgroundColor: "white",
	  border: "none"
        });
      }

      if (player_color == BLOCK_KIND.WHITE) {
        $("#white_player_name").css({
          backgroundColor: "gainsboro",
          border: "3px solid",
          borderColor: "yellow"
        });
      } else if (player_color == BLOCK_KIND.BLACK) {
        $("#white_player_name").css({
          backgroundColor: "white",
          border: "none"
        });
      }
    } else if (hand_flag == true && temp_hand > 0) {
      if (player_color == BLOCK_KIND.WHITE) {
        $("#black_player_name").css({
          backgroundColor: "gainsboro",
          border: "3px solid",
          borderColor: "yellow"
        });
      } else if (player_color == BLOCK_KIND.BLACK) {
        $("#black_player_name").css({
          backgroundColor: "white",
          border: "none"
        });
      }

      if (player_color == BLOCK_KIND.BLACK) {
        $("#white_player_name").css({
          backgroundColor: "gainsboro",
          border: "3px solid",
          borderColor: "yellow"
        });
      } else if (player_color == BLOCK_KIND.WHITE) {
        $("#white_player_name").css({
          backgroundColor: "white",
          border: "none"
        });
      }
    }
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
    if (isPass(i) && !isFinish(i) && !allSameColor(i)) {
      if(player_color == BLOCK_KIND.BLACK) {
        alert("黒の置ける場所がありません。続けて白の番となります。");
      } else if (player_color == BLOCK_KIND.WHITE) {
        alert("白の置ける場所がありません。続けて黒の番となります。");
      } else {
        alert("invalid status 2");
      }
      
      player_color = BLOCK_KIND.MAX - player_color;
      player_color_array[i] = player_color;

      if(isPass(i) && !isFinish(i) && !allSameColor(i)) {
	if(player_color == BLOCK_KIND.BLACK) {
          isFinished = true;
          alert("黒も置ける場所がありません。試合終了です。");
        } else if (player_color == BLOCK_KIND.WHITE) {
	  isFinished = true;
          alert("白も置ける場所がありません。試合終了です。");
        } else {
          alert("invalid status 3");
        }
	judgment(i);

        if (isFinished == true) {
          $("#black_player_name").css({
            backgroundColor: "white",
            border: "none"
          });
          $("#white_player_name").css({
            backgroundColor: "white",
            border: "none"
          });
	  isFinished = false;
        }	

      }
     
      pass = true;
    }

    return pass;
  };

  var judgment = function(i) {
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
 
    if (black > white) {
      alert("黒の勝ちです。");
    } else if(white > black) {
      alert("白の勝ちです。");
　  } else {
      alert("引き分けです。");
    }   
  
  }

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
          hand_flag = true;
          //doAiPlayer関数内
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
//    black_stone_next_hand_cell = 
//      document.getElementById("black");
//    white_stone_next_hand_cell =
//      document.getElementById("white");
//    black_stone_choice_cell =
//      document.getElementById("black");
//    white_stone_choice_cell =
//      document.getElementById("white");
//    none_stone_choice_cell =
//      document.getElementById("cell");
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
    stone_black_yellow_frame_corner =
      document.getElementById("yellow_frame_corner");
    stone_black_yellow_frame_side_frame =
      document.getElementById("yellow_frame_side_frame");
    stone_black_yellow_frame_vertical_frame =
      document.getElementById("yellow_frame_vertical_frame");
    stone_white_yellow_frame_corner =
      document.getElementById("yellow_frame_corner");
    stone_white_yellow_frame_side_frame =
      document.getElementById("yellow_frame_side_frame");
    stone_white_yellow_frame_vertical_frame =
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
    } else if (vsAI == false) {
      $("#Computer_checkbox").prop("checked",false);
    }


  
    alert("edit_board = " + edit_board);
    
    initBoard();
    //alert("board[0](initBoard() = " + board[0]);      
    board0 = gon.board0;
    //alert("board0(gon.board0) = " + board0);
    player_color0 = gon.player_color0;
    //alert("player_color0 = " + player_color0);


    var e = document.getElementById("your_stone_color_frame");

    while(e.firstChild) {
      e.removeChild(e.firstChild);
    }

    //  show stone_black yellow_frame corner

    var stone_black_yellow_frame_top_left_corner = stone_black_yellow_frame_corner.cloneNode(true);
   
    stone_black_yellow_frame_top_left_corner.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_top_left_corner);

    var stone_black_yellow_frame_top_right_corner = stone_black_yellow_frame_corner.cloneNode(true);

    stone_black_yellow_frame_top_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_black_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_top_right_corner);

    var stone_black_yellow_frame_bottom_left_corner = stone_black_yellow_frame_corner.cloneNode(true);

    stone_black_yellow_frame_bottom_left_corner.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_bottom_left_corner);

    var stone_black_yellow_frame_bottom_right_corner = stone_black_yellow_frame_corner.cloneNode(true);

    stone_black_yellow_frame_bottom_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_black_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_bottom_right_corner);
    
    // show black_next yellow_frame frame

    var stone_black_yellow_frame_top_side_frame = stone_black_yellow_frame_side_frame.cloneNode(true);

    stone_black_yellow_frame_top_side_frame.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_top_side_frame);


    var stone_black_yellow_frame_bottom_side_frame = stone_black_yellow_frame_side_frame.cloneNode(true);

    stone_black_yellow_frame_bottom_side_frame.style.left = 0 * CELL_WIDTH + "px";
    stone_black_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_bottom_side_frame);

	      
    var stone_black_yellow_frame_left_vertical_frame = stone_black_yellow_frame_vertical_frame.cloneNode(true);

    stone_black_yellow_frame_left_vertical_frame.style.left = 0 * CELL_WIDTH  + "px";
    stone_black_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_left_vertical_frame);


    var stone_black_yellow_frame_right_vertical_frame = stone_black_yellow_frame_vertical_frame.cloneNode(true);

    stone_black_yellow_frame_right_vertical_frame.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_black_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_black_yellow_frame_right_vertical_frame);
 

    //  show stone_white yellow_frame corner

    var stone_white_yellow_frame_top_left_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_top_left_corner.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_top_left_corner);

    var stone_white_yellow_frame_top_right_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_top_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_white_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_top_right_corner);

    var stone_white_yellow_frame_bottom_left_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_bottom_left_corner.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_bottom_left_corner);

    var stone_white_yellow_frame_bottom_right_corner = stone_white_yellow_frame_corner.cloneNode(true);

    stone_white_yellow_frame_bottom_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_white_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_bottom_right_corner);

    // show stone_white yellow_frame frame

    var stone_white_yellow_frame_top_side_frame = stone_white_yellow_frame_side_frame.cloneNode(true);

    stone_white_yellow_frame_top_side_frame.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_top_side_frame);


    var stone_white_yellow_frame_bottom_side_frame = stone_white_yellow_frame_side_frame.cloneNode(true);

    stone_white_yellow_frame_bottom_side_frame.style.left = 1 * CELL_WIDTH + "px";
    stone_white_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_bottom_side_frame);


    var stone_white_yellow_frame_left_vertical_frame = stone_white_yellow_frame_vertical_frame.cloneNode(true);

    stone_white_yellow_frame_left_vertical_frame.style.left = 1 * CELL_WIDTH  + "px";
    stone_white_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_left_vertical_frame);


    var stone_white_yellow_frame_right_vertical_frame = stone_white_yellow_frame_vertical_frame.cloneNode(true);

    stone_white_yellow_frame_right_vertical_frame.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
    stone_white_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
    //e.appendChild(stone_white_yellow_frame_right_vertical_frame);




    if (your_move == "first") {
      $("#First_checkbox").prop("checked",true);
      e.appendChild(stone_black_yellow_frame_top_left_corner);
      e.appendChild(stone_black_yellow_frame_top_right_corner);
      e.appendChild(stone_black_yellow_frame_bottom_left_corner);
      e.appendChild(stone_black_yellow_frame_bottom_right_corner);
      e.appendChild(stone_black_yellow_frame_top_side_frame);
      e.appendChild(stone_black_yellow_frame_bottom_side_frame);
      e.appendChild(stone_black_yellow_frame_left_vertical_frame);
      e.appendChild(stone_black_yellow_frame_right_vertical_frame);
      stone_black_yellow_frame_length = 1;
      stone_white_yellow_frame_length = 0;
   } else if (your_move == "second") {
      $("#First_checkbox").prop("checked",false);
      e.appendChild(stone_white_yellow_frame_top_left_corner);
      e.appendChild(stone_white_yellow_frame_top_right_corner);
      e.appendChild(stone_white_yellow_frame_bottom_left_corner);
      e.appendChild(stone_white_yellow_frame_bottom_right_corner);
      e.appendChild(stone_white_yellow_frame_top_side_frame);
      e.appendChild(stone_white_yellow_frame_bottom_side_frame);
      e.appendChild(stone_white_yellow_frame_left_vertical_frame);
      e.appendChild(stone_white_yellow_frame_right_vertical_frame);
      stone_white_yellow_frame_length = 1;
      stone_black_yellow_frame_length = 0;
   } else {
      alert("invalid status 1");
   }
	

    if (edit_board == true) {
      edit_flag = true;
      $("#Reset").prop("disabled", true);
      $("#Reset2").prop("disabled", true);
      $("#Save").prop("disabled", true);
      $("#SaveAs").prop("disabled", true);
      $("#EditBoard").prop("disabled", true);
      $("#back_to_beginning").hide();
      $("#previous_button").hide();
      $("#next_button").hide();
      $("#go_to_end").hide();
      $("#open_button").prop("disabled", true);
      $("#clipboard_button").prop("disabled", true);
      $(".comment_textarea").attr("disabled", true);
      $("#save_comment").hide();
      $("#cancel_comment").hide();
      $("#delete_comment").hide();
　　　//トップページで盤面編集を選んだ場合
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
      $("#next_hand_frame").hide();
      $("#stone_selection_frame").hide();
      $("#save_comment").hide();
      $("#cancel_comment").hide();
      $("#delete_comment").hide();

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
	ReadAndPlay1();
/*	alert("kifu = " + kifu);
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
	  hand_flag = false;
          for_jump_temp_hand = 0;

          // start game
	  // トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが空の場合
          showBoard(last_hand);

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
	      //alert("i = " + i);
	      if (i == 0) {
		temp_handd = 0;
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
                hand_flag = false;
                for_jump_temp_hand = 0;

                // start game
                // トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが１手目で不正だった場合 
                showBoard(last_hand);
	      }
	      break;
            }
            _x = n;
            _y = kifu.charAt(i + 1) - 1;
	    if (!is07Number(_y)) {
	      invalid_flag = true;
	      //alert("i = " + i);
              if (i == 0) {
		temp_handd = 0;
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
                hand_flag = false;
                for_jump_temp_hand = 0;

                // start game
                // トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが１手目で不正だった場合
                showBoard(last_hand);
	      }
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
	      hand_flag = false;
	　　　
              
              //start game
              //トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが空でない場合
	      showBoard(last_hand);


	    } else {
	      //alert((temp_handd + 1) + "手目が不正です。hasamenai ");
              invalid_flag = true;
	      break i_loop;
	    }	 
          }
          if (invalid_flag == true ) {
            alert((temp_handd + 1) +  "手目が不正です。switch");
          }	  
          $('#text0').val(gon.comment0);
	  $('#text1').val(gon.comment1);
	  $('#text2').val(gon.comment2);
          $('#text3').val(gon.comment3);
          $('#text4').val(gon.comment4);
          $('#text5').val(gon.comment5);
          $('#text6').val(gon.comment6);
          $('#text7').val(gon.comment7);
	  $('#text8').val(gon.comment8);
          $('#text9').val(gon.comment9);
          $('#text10').val(gon.comment10);
          $('#text11').val(gon.comment11);
          $('#text12').val(gon.comment12);
          $('#text13').val(gon.comment13);
          $('#text14').val(gon.comment14);
          $('#text15').val(gon.comment15);
          $('#text16').val(gon.comment16);
          $('#text17').val(gon.comment17);
          $('#text18').val(gon.comment18);
          $('#text19').val(gon.comment19);
	  $('#text20').val(gon.comment20);
          $('#text21').val(gon.comment21);
          $('#text22').val(gon.comment22);
          $('#text23').val(gon.comment23);
          $('#text24').val(gon.comment24);
          $('#text25').val(gon.comment25);
          $('#text26').val(gon.comment26);
          $('#text27').val(gon.comment27);
          $('#text28').val(gon.comment28);
          $('#text29').val(gon.comment29);
	  $('#text30').val(gon.comment30);
          $('#text31').val(gon.comment31);
          $('#text32').val(gon.comment32);
          $('#text33').val(gon.comment33);
          $('#text34').val(gon.comment34);
          $('#text35').val(gon.comment35);
          $('#text36').val(gon.comment36);
          $('#text37').val(gon.comment37);
          $('#text38').val(gon.comment38);
          $('#text39').val(gon.comment39);
	  $('#text40').val(gon.comment40);
          $('#text41').val(gon.comment41);
          $('#text42').val(gon.comment42);
          $('#text43').val(gon.comment43);
          $('#text44').val(gon.comment44);
          $('#text45').val(gon.comment45);
          $('#text46').val(gon.comment46);
          $('#text47').val(gon.comment47);
          $('#text48').val(gon.comment48);
          $('#text49').val(gon.comment49);
	  $('#text50').val(gon.comment50);
          $('#text51').val(gon.comment51);
          $('#text52').val(gon.comment52);
          $('#text53').val(gon.comment53);
          $('#text54').val(gon.comment54);
          $('#text55').val(gon.comment55);
          $('#text56').val(gon.comment56);
          $('#text57').val(gon.comment57);
          $('#text58').val(gon.comment58);
          $('#text59').val(gon.comment59);
	  $('#text60').val(gon.comment60);
          $('#text61').val(gon.comment61);
          $('#text62').val(gon.comment62);
          $('#text63').val(gon.comment63);
          $('#text64').val(gon.comment64);
        } */
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
	hand_flag = true;
        for_jump_temp_hand = 0;


        // start game
	//トップページで盤面編集を選ばず、ファイルから開かない場合
        showBoard(last_hand);
        if(!isFirst) {
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

    if(document.form1.Computer.checked) {
      vsAI = true;
    } else {
      vsAI = false;
    }
/*   
    if(document.form1.First.checked) {
      isFirst = true;
      your_move = "first";
    } else {
      isFirst = false;
      your_move = "second";
    }
*/
    if(stone_black_yellow_frame_length == 1) {
      isFirst = true;
      your_move = "first";
    } else if(stone_white_yellow_frame_length == 1) {
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
    hand_flag = true;
    for_jump_temp_hand = 0;

    // start game
    //Resetボタンを押した場合
    showBoard(last_hand);
    if(!isFirst) {
      doAiPlayer(last_hand);
    }

  };

  document.getElementById("Reset2").onclick = function() {
    
    // initialize board
    //initBoard();

    kifu = kifu.slice(0, temp_hand * 2);

    // 0:石無し, 1:黒, 2:白
    dot =
      document.getElementById("dot");
    corner =
      document.getElementById("corner");
    side_frame = 
      document.getElementById("side_frame");
    vertical_frame =
      document.getElementById("vertical_frame");
//    black_stone_next_hand_cell = 
//      document.getElementById("black");
//    white_stone_next_hand_cell =
//      document.getElementById("white");
//    black_stone_choice_cell =
//      document.getElementById("black");
//    white_stone_choice_cell =
//      document.getElementById("white");
//    none_stone_choice_cell =
//      document.getElementById("cell");
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
    stone_black_yellow_frame_corner =
      document.getElementById("yellow_frame_corner");
    stone_black_yellow_frame_side_frame =
      document.getElementById("yellow_frame_side_frame");
    stone_black_yellow_frame_vertical_frame =
      document.getElementById("yellow_frame_vertical_frame");
    stone_white_yellow_frame_corner =
      document.getElementById("yellow_frame_corner");
    stone_white_yellow_frame_side_frame =
      document.getElementById("yellow_frame_side_frame");
    stone_white_yellow_frame_vertical_frame =
      document.getElementById("yellow_frame_vertical_frame");
    stone = [
      document.getElementById("cell"),
      document.getElementById("black"),
      document.getElementById("white")
    ];
 
    if(document.form1.Computer.checked) {
      vsAI = true;
    } else {
      vsAI = false;
    }
/*    
    if(document.form1.First.checked) {
      isFirst = true;
      your_move = "first";
    } else {
      isFirst = false;
      your_move = "second";
    }
*/
    if(stone_black_yellow_frame_length == 1) {
      isFirst = true;
      your_move = "first";
    } else if(stone_white_yellow_frame_length == 1) {
      isFirst = false;
      your_move = "second";
    }
    from_saved = false;
    //alert("temp_hand = " + temp_hand);
    //$("#a" + temp_hand).unwrap();
    $("#a" + temp_hand).unwrap();
    //last_hand = 0;
    //temp_hand = 0;
    //previous_temp_hand = 0;
    wrap_flag = true;
    beginning_flag = false;
    end_flag = false;
    link_flag = false;
    from_saved_first_flag = false;
    cancel_flag = true;
    hand_flag = false;
    //for_jump_temp_hand = 0;

    //alert("temp_hand = " + temp_hand);
    //alert("previous_temp_hand = " + previous_temp_hand);


//    if (!(beginning_flag == true || end_flag == true || link_flag == true)) {
//      if (temp_hand == previous_temp_hand + 1 || temp_hand == previous_temp_hand - 1) {
//        if (from_saved_first_flag == false) {
//          if (cancel_flag == false) {
//            $("#a" + previous_temp_hand).unwrap();
//          }
//        }
//      }
//    }


    //alert("player_color = " + player_color);
    //alert("your_move = " + your_move);
    //alert("vsAI = " + vsAI);
 

    // start game
    //Reset2ボタンを押した場合
    showBoard(temp_hand);
    //if(!isFirst) {
      doAiPlayer(temp_hand);
    //}

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
	comment0: $('#text0').val(),
	comment1: $('#text1').val(),
        comment2: $('#text2').val(),
	comment3: $('#text3').val(),
	comment4: $('#text4').val(),
	comment5: $('#text5').val(),
        comment6: $('#text6').val(),
        comment7: $('#text7').val(),
        comment8: $('#text8').val(),
        comment9: $('#text9').val(),
        comment10: $('#text10').val(),
        comment11: $('#text11').val(),
        comment12: $('#text12').val(),
        comment13: $('#text13').val(),
        comment14: $('#text14').val(),
        comment15: $('#text15').val(),
        comment16: $('#text16').val(),
        comment17: $('#text17').val(),
        comment18: $('#text18').val(),
        comment19: $('#text19').val(),
	comment20: $('#text20').val(),
        comment21: $('#text21').val(),
        comment22: $('#text22').val(),
        comment23: $('#text23').val(),
        comment24: $('#text24').val(),
        comment25: $('#text25').val(),
        comment26: $('#text26').val(),
        comment27: $('#text27').val(),
        comment28: $('#text28').val(),
        comment29: $('#text29').val(),
	comment30: $('#text30').val(),
        comment31: $('#text31').val(),
        comment32: $('#text32').val(),
        comment33: $('#text33').val(),
        comment34: $('#text34').val(),
        comment35: $('#text35').val(),
        comment36: $('#text36').val(),
        comment37: $('#text37').val(),
        comment38: $('#text38').val(),
        comment39: $('#text39').val(),
	comment40: $('#text40').val(),
        comment41: $('#text41').val(),
        comment42: $('#text42').val(),
        comment43: $('#text43').val(),
        comment44: $('#text44').val(),
        comment45: $('#text45').val(),
        comment46: $('#text46').val(),
        comment47: $('#text47').val(),
        comment48: $('#text48').val(),
        comment49: $('#text49').val(),
	comment50: $('#text50').val(),
        comment51: $('#text51').val(),
        comment52: $('#text52').val(),
        comment53: $('#text53').val(),
        comment54: $('#text54').val(),
        comment55: $('#text55').val(),
        comment56: $('#text56').val(),
        comment57: $('#text57').val(),
        comment58: $('#text58').val(),
        comment59: $('#text59').val(),
	comment60: $('#text60').val(),
        comment61: $('#text61').val(),
        comment62: $('#text62').val(),
        comment63: $('#text63').val(),
        comment64: $('#text64').val(),
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
    hand_flag = false;
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
    hand_flag = false;
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
    hand_flag = false;
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
    hand_flag = false;
    hand_flag = false;
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
      hand_flag = false;
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
    $("#Reset").prop("disabled", false);
    $("#Reset2").prop("disabled", false);
    $("#Save").prop("disabled", false);
    $("#SaveAs").prop("disabled", false);
    $("#EditBoard").prop("disabled", false);
    $("#back_to_beginning").show();
    $("#previous_button").show();
    $("#next_button").show();
    $("#go_to_end").show();
    $("#open_button").prop("disabled", false);
    $("#clipboard_button").prop("disabled", false);
    $(".comment_textarea").attr("disabled", false);
	
    

    if(document.form1.Computer.checked) {
      vsAI = true;
    } else {
      vsAI = false;
    }
    
/*
    if(document.form1.First.checked) {
      isFirst = true;
      your_move = "first";
    } else {
      isFirst = false;
      your_move = "second";
    }
*/
    if(stone_black_yellow_frame_length == 1) {
      isFirst = true;
      your_move = "first";
    } else if(stone_white_yellow_frame_length == 1) {
      isFirst = false;
      your_move = "second";
    }


    alert("your_move = " + your_move);
    alert("vsAI = " + vsAI);
  
    

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
    hand_flag = true;
    for_jump_temp_hand = 0;
    edit_board = false;
    
    

    $("#next_hand_frame").children().remove();
    $("#stone_selection_frame").children().remove();
    $("#next_hand").children().remove();
    $("#stone_selection").children().remove();


    //var black_stone_next_hand = black_stone_next_hand_cell.cloneNode(true);
    //black_stone_next_hand.style.display="none";	  
	  
	  
    //document.getElementById("next_hand").style.display="none";
    //$("#next_hand").hide();
    //$("#next_hand").css('margin-top', '0px');

    //var c1 = document.getElementById("black_cell");
    //while(c1.firstChild) {
    //  c1.removeChild(c1.firstChild);
    //}

    //$("#stone_selection").hide();

   


    black_next_yellow_frame_length = 0;
    white_next_yellow_frame_length = 0;
    black_select_yellow_frame_length = 0;
    white_select_yellow_frame_length = 0;
    none_select_yellow_frame_length = 0;   
/*
    var element = document.getElementById("next_hand");
    element.remove();
*/

    kifu = "";

    // start game
    //edit_board_okを選んだ場合
    showBoard(last_hand);
    doAiPlayer(last_hand);
  });

  $("#edit_board_cancel").click(function() {
    $("#edit_board_ok").hide();
    $("#edit_board_cancel").hide();
    $("#next_hand_text").hide();
    $("#stone_selection_text").hide();
    $("#msg_kifu").show();
    $("#simple_kifu").show();
    $("#Reset").prop("disabled", false);
    $("#Reset2").prop("disabled", false);
    $("#Save").prop("disabled", false);
    $("#SaveAs").prop("disabled", false);
    $("#EditBoard").prop("disabled", false);
    $("#back_to_beginning").show();
    $("#previous_button").show();
    $("#next_button").show();
    $("#go_to_end").show();
    $("#open_button").prop("disabled", false);
    $("#clipboard_button").prop("disabled", false);
    $(".comment_textarea").attr("disabled", false);

    if (edit_board == false) {	  
    
      player_color = saved_player_color;
 	    
      vsAI = saved_vsAI;
      isFirst = saved_isFirst;
      your_move = saved_your_move;
      
      if (vsAI == true) {
        $("#Computer_checkbox").prop("checked",true);
      } else if (vsAI == false) {
	$("#Computer_checkbox").prop("checked",false);
      }

      
      var e = document.getElementById("your_stone_color_frame");

      while(e.firstChild) {
        e.removeChild(e.firstChild);
      }

      //  show stone_black yellow_frame corner

      var stone_black_yellow_frame_top_left_corner = stone_black_yellow_frame_corner.cloneNode(true);
   
      stone_black_yellow_frame_top_left_corner.style.left = 0 * CELL_WIDTH + "px";
      stone_black_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_black_yellow_frame_top_left_corner);

      var stone_black_yellow_frame_top_right_corner = stone_black_yellow_frame_corner.cloneNode(true);

      stone_black_yellow_frame_top_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
      stone_black_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_black_yellow_frame_top_right_corner);

      var stone_black_yellow_frame_bottom_left_corner = stone_black_yellow_frame_corner.cloneNode(true);

      stone_black_yellow_frame_bottom_left_corner.style.left = 0 * CELL_WIDTH + "px";
      stone_black_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
      //e.appendChild(stone_black_yellow_frame_bottom_left_corner);

      var stone_black_yellow_frame_bottom_right_corner = stone_black_yellow_frame_corner.cloneNode(true);

      stone_black_yellow_frame_bottom_right_corner.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
      stone_black_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
      //e.appendChild(stone_black_yellow_frame_bottom_right_corner);
    
      // show black_next yellow_frame frame

      var stone_black_yellow_frame_top_side_frame = stone_black_yellow_frame_side_frame.cloneNode(true);

      stone_black_yellow_frame_top_side_frame.style.left = 0 * CELL_WIDTH + "px";
      stone_black_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_black_yellow_frame_top_side_frame);


      var stone_black_yellow_frame_bottom_side_frame = stone_black_yellow_frame_side_frame.cloneNode(true);

      stone_black_yellow_frame_bottom_side_frame.style.left = 0 * CELL_WIDTH + "px";
      stone_black_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
      //e.appendChild(stone_black_yellow_frame_bottom_side_frame);

	      
      var stone_black_yellow_frame_left_vertical_frame = stone_black_yellow_frame_vertical_frame.cloneNode(true);

      stone_black_yellow_frame_left_vertical_frame.style.left = 0 * CELL_WIDTH  + "px";
      stone_black_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_black_yellow_frame_left_vertical_frame);


      var stone_black_yellow_frame_right_vertical_frame = stone_black_yellow_frame_vertical_frame.cloneNode(true);

      stone_black_yellow_frame_right_vertical_frame.style.left = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
      stone_black_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_black_yellow_frame_right_vertical_frame);
 

      //  show stone_white yellow_frame corner

      var stone_white_yellow_frame_top_left_corner = stone_white_yellow_frame_corner.cloneNode(true);

      stone_white_yellow_frame_top_left_corner.style.left = 1 * CELL_WIDTH + "px";
      stone_white_yellow_frame_top_left_corner.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_white_yellow_frame_top_left_corner);

      var stone_white_yellow_frame_top_right_corner = stone_white_yellow_frame_corner.cloneNode(true);

      stone_white_yellow_frame_top_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
      stone_white_yellow_frame_top_right_corner.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_white_yellow_frame_top_right_corner);

      var stone_white_yellow_frame_bottom_left_corner = stone_white_yellow_frame_corner.cloneNode(true);

      stone_white_yellow_frame_bottom_left_corner.style.left = 1 * CELL_WIDTH + "px";
      stone_white_yellow_frame_bottom_left_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
      //e.appendChild(stone_white_yellow_frame_bottom_left_corner);

      var stone_white_yellow_frame_bottom_right_corner = stone_white_yellow_frame_corner.cloneNode(true);

      stone_white_yellow_frame_bottom_right_corner.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
      stone_white_yellow_frame_bottom_right_corner.style.top = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
      //e.appendChild(stone_white_yellow_frame_bottom_right_corner);

      // show stone_white yellow_frame frame

      var stone_white_yellow_frame_top_side_frame = stone_white_yellow_frame_side_frame.cloneNode(true);

      stone_white_yellow_frame_top_side_frame.style.left = 1 * CELL_WIDTH + "px";
      stone_white_yellow_frame_top_side_frame.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_white_yellow_frame_top_side_frame);


      var stone_white_yellow_frame_bottom_side_frame = stone_white_yellow_frame_side_frame.cloneNode(true);

      stone_white_yellow_frame_bottom_side_frame.style.left = 1 * CELL_WIDTH + "px";
      stone_white_yellow_frame_bottom_side_frame.style.top  = 1 * CELL_WIDTH - YELLOW_WIDTH + "px";
      //e.appendChild(stone_white_yellow_frame_bottom_side_frame);


      var stone_white_yellow_frame_left_vertical_frame = stone_white_yellow_frame_vertical_frame.cloneNode(true);

      stone_white_yellow_frame_left_vertical_frame.style.left = 1 * CELL_WIDTH  + "px";
      stone_white_yellow_frame_left_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_white_yellow_frame_left_vertical_frame);


      var stone_white_yellow_frame_right_vertical_frame = stone_white_yellow_frame_vertical_frame.cloneNode(true);

      stone_white_yellow_frame_right_vertical_frame.style.left = 2 * CELL_WIDTH - YELLOW_WIDTH + "px";
      stone_white_yellow_frame_right_vertical_frame.style.top = 0 * CELL_WIDTH + "px";
      //e.appendChild(stone_white_yellow_frame_right_vertical_frame);

      if (your_move == "first") {
        $("#First_checkbox").prop("checked",true);
        e.appendChild(stone_black_yellow_frame_top_left_corner);
        e.appendChild(stone_black_yellow_frame_top_right_corner);
        e.appendChild(stone_black_yellow_frame_bottom_left_corner);
        e.appendChild(stone_black_yellow_frame_bottom_right_corner);
        e.appendChild(stone_black_yellow_frame_top_side_frame);
        e.appendChild(stone_black_yellow_frame_bottom_side_frame);
        e.appendChild(stone_black_yellow_frame_left_vertical_frame);
        e.appendChild(stone_black_yellow_frame_right_vertical_frame);
        stone_black_yellow_frame_length = 1;
        stone_white_yellow_frame_length = 0;
      } else if (your_move == "second") {
        $("#First_checkbox").prop("checked",false);
        e.appendChild(stone_white_yellow_frame_top_left_corner);
        e.appendChild(stone_white_yellow_frame_top_right_corner);
        e.appendChild(stone_white_yellow_frame_bottom_left_corner);
        e.appendChild(stone_white_yellow_frame_bottom_right_corner);
        e.appendChild(stone_white_yellow_frame_top_side_frame);
        e.appendChild(stone_white_yellow_frame_bottom_side_frame);
        e.appendChild(stone_white_yellow_frame_left_vertical_frame);
        e.appendChild(stone_white_yellow_frame_right_vertical_frame);
        stone_white_yellow_frame_length = 1;
        stone_black_yellow_frame_length = 0;
      }
	

	    
/*	    
      if (your_move == "first") {
        $("#First_checkbox").prop("checked",true);
      } else if (your_move == "second") {
	$("#First_checkbox").prop("checked",false);
      }
*/	    
      alert("your_move = " + your_move);
      alert("vsAI = " + vsAI);
      alert("edit_board = " + edit_board);
      from_saved = saved_from_saved;
      from_saved = false;
      last_hand = saved_last_hand;
      temp_hand = saved_temp_hand;
      alert("temp_hand = " + temp_hand);
      previous_temp_hand = saved_previous_temp_hand;
      wrap_flag = false;
      beginning_flag = saved_beginning_flag;
      end_flag = saved_end_flag;
      link_flag = saved_link_flag;
      from_saved_first_flag = saved_from_saved_first_flag;
      for_jump_temp_hand = saved_for_jump_temp_hand;

      cancel_flag = true;
      hand_flag =  false;
      edit_board = false;

      // initial position
      for (var i = 0; i < BOARD_SIZE.HEIGHT+1; i++) {
        for (var j = 0; j < BOARD_SIZE.WIDTH+1; j++) {
          board[0][i][j] = saved_board[i][j];
        }
      }

      //alert("koko kitenai");

      $("#next_hand_frame").children().remove();
      $("#stone_selection_frame").children().remove();
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
      //トップページで盤面編集を選ばず、edit_board_cancelを選んだ場合
      showBoard(temp_hand);
      if(!isFirst) {
        doAiPlayer(temp_hand);
      }          

    } else if (edit_board == true) {
      alert("edit_board = " + edit_board);
      // initialize board
      initBoard();

      vsAI = false;
      isFirst = true;
      your_move = "first";
	    
      from_saved = false;
      last_hand = 0;
      temp_hand = 0;

      previous_temp_hand = 0;
      wrap_flag = true;
      beginning_flag = false;
      end_flag = false;
      link_flag = false;
      from_saved_first_flag = false;
      cancel_flag = true;
      hand_flag = true;
      for_jump_temp_hand = 0;

      $("#next_hand_frame").children().remove();
      $("#stone_selection_frame").children().remove();
      $("#next_hand").children().remove();
      $("#stone_selection").children().remove();	  
/*
      $("#next_hand_frame").hide();
      $("#stone_selection_frame").hide();
      $("#next_hand_frame").hide();
      $("#stone_selection_frame").hide();
*/
      black_next_yellow_frame_length = 0;
      white_next_yellow_frame_length = 0;
      black_select_yellow_frame_length = 0;
      white_select_yellow_frame_length = 0;
      none_select_yellow_frame_length = 0;


      // start game
      //トップページで盤面編集を選んで、edit_board_cancelを選んだ場合
      showBoard(last_hand);
      if(!isFirst) {
        doAiPlayer(last_hand);
      }
    }


  });


  $("#EditBoard").click(function() {
    $("#next_hand_text").show();
    $("#stone_selection_text").show();
    $("#next_hand").show();
    $("#stone_selection").show();
    $("#next_hand_frame").show();
    $("#stone_selection_frame").show();
    $("#edit_board_ok").show();
    $("#edit_board_cancel").show();
    $("#Reset").prop("disabled", true);
    $("#Reset2").prop("disabled", true);	  
    $("#Save").prop("disabled", true);
    $("#SaveAs").prop("disabled", true);
    $("#EditBoard").prop("disabled", true);
    $("#back_to_beginning").hide();
    $("#previous_button").hide();
    $("#next_button").hide();
    $("#go_to_end").hide();
    $("#open_button").prop("disabled", true);
    $("#clipboard_button").prop("disabled", true);
    $(".comment_textarea").attr("disabled", true);	  

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

    saved_player_color = player_color;
   
    from_saved = false;

    saved_vsAI = vsAI;
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
    var str = $('#text' + temp_hand).val();
    alert(str);
    $.ajax({
      url: '/save_comment/update',
      type: "GET",
      dataType: "html",
      async: true,
      data: {
        game_record_id: game_record_id,
        temp_hand: temp_hand,
	comment: str,
      },
      success: function(data) {
        alert("success");
      },
      error: function(data) {
        alert("errror");
      }
    });

  });

  $("#cancel_comment").click(function() {
    $('#text' + temp_hand).val("");
  });

  $("#delete_comment").click(function() {
    game_record_id = gon.game_record_id;
    alert(game_record_id);
    alert("delete_comment");
    $('#text' + temp_hand).val("");
    //alert(str);
    $.ajax({
      url: '/delete_comment/update',
      type: "GET",
      dataType: "html",
      async: true,
      data: {
        game_record_id: game_record_id,
        temp_hand: temp_hand,
      },
      success: function(data) {
        alert("success");
      },
      error: function(data) {
        alert("errror");
      }
    });

  });

  $(".comment_textarea").click(function() {
    $("#save_comment").show();
    $("#cancel_comment").show();
    $("#delete_comment").show();
  });

  $('body').click(function(event) {
    if (!$(event.target).closest('.comment_textarea').length) {
      $('#save_comment').hide();
      $('#cancel_comment').hide();
      $('#delete_comment').hide();
    };
  });

  $("#Transform").click(function() {

    alert("player_color = " + player_color_array[0]);
    

    KifuNormalize();   

    KifuSigma();
  
    //for(var j = 0; j < normalized_kifu_x.length; j++) {
    //  alert("normalized_kifu_x[" + j + "] = " + normalized_kifu_x[j]);
    //}
  
    //for(var k = 0; k < normalized_kifu_y.length; k++) {
    //  alert("normalized_kifu_y[" + k + "] = " + normalized_kifu_y[k]);
    //}

   KifuUnNormalize();

   Board0Normalize();

   Board0SigmaAndUnNormalize();
     
   ReadAndPlay2();
 


  });

  var KifuNormalize = function() {

    alert("kifu = " + kifu);
    var n;
    var ii;
    var _x;
    var _y;
    var invalid_flag = false;
    if (kifu.length == 0) {
        

    } else {	      
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
	  //alert("i = " + i);
	  if (i == 0) {
            ii = -1;
	  }   
	  break;
        }
        _x = n;
        _y = kifu.charAt(i + 1) - 1;
	if (!is07Number(_y)) {
	  invalid_flag = true;
	  //alert("i = " + i);
	  if (i == 0) {
            ii = -1;
	  } 
	  break;
        }
	_x = _x * 10 - 35;
	_y = _y * 10 - 35;
	normalized_kifu_x.push(_x);
	normalized_kifu_y.push(_y);
	//for(var j1 = 0; j1 < normalized_kifu_x.length; j1++) {
        //  alert("normalized_kifu_x[" + j1 + "] = " + normalized_kifu_x[j1]);
        //}
        //for(var j2 = 0; j2 < normalized_kifu_y.length; j2++) {
        //  alert("normalized_kifu_y[" + j2 + "] = " + normalized_kifu_y[j2]);
        //}

	//alert("x = " + _x);
	//alert("y = " + _y);
	ii = i / 2;
	//alert("ii = " + ii); 
      }  
      if (invalid_flag == true ) {
        alert((ii + 2) +  "手目が不正です。switch");
      }
      //alert("for文終わりました。");
    }
    //alert("if文が終わりました。");
  };

  var KifuSigma = function() {

    var normalized_kifu_xd = [];
    var normalized_kifu_yd = [];

    for(var j1 = 0; j1 < normalized_kifu_x.length; j1++) {
      normalized_kifu_xd[j1] = normalized_kifu_x[j1];
      //alert(normalized_kifu_xd[j1]);
    }

    for(var j2 = 0; j2 < normalized_kifu_y.length; j2++) {
      normalized_kifu_x[j2] = -normalized_kifu_y[j2];
      //alert(normalized_kifu_x[j2]);
    }

    for(var j3 = 0; j3 < normalized_kifu_xd.length; j3++) {
      normalized_kifu_y[j3] = normalized_kifu_xd[j3];
      //alert(normalized_kifu_y[j3]);
    }

  };

  var KifuUnNormalize = function() {

    for(var j1 = 0; j1 < normalized_kifu_x.length; j1++) {
      normalized_kifu_x[j1] = (normalized_kifu_x[j1] + 35) / 10;
      //alert(normalized_kifu_x[j1]);
    }
    for(var j2 = 0; j2 < normalized_kifu_y.length; j2++) {
      normalized_kifu_y[j2] = (normalized_kifu_y[j2] + 35) / 10;
      //alert(normalized_kifu_y[j2]);
    }
    
    kifu = "";

    //alert("transformed kifu 0 = " + kifu);
    
    for(var j3 = 0; j3 < normalized_kifu_x.length; j3++) {
      //alert(Alphabet[normalized_kifu_x[j3]]);
      kifu = kifu +  Alphabet[normalized_kifu_x[j3]];
      //alert((normalized_kifu_y[j3] + 1).toString());
      kifu = kifu + (normalized_kifu_y[j3] + 1).toString();
    }
 
    alert("transformed kifu = " + kifu);
   
    normalized_kifu_x = [];
    normalized_kifu_y = [];


  };

  var Board0Normalize = function() {

    for (var i1 = -35; i1 <= (BOARD_SIZE.HEIGHT - 1) * 10 - 35; i1 += 10) {
      normalized_board0[i1] = [];
      for (var j1 = -35; j1 <= (BOARD_SIZE.WIDTH - 1) * 10 - 35; j1 += 10) {
        normalized_board0[i1][j1] = BLOCK_KIND.NONE;
      }
    }

    for (var i2 = 0; i2 < BOARD_SIZE.HEIGHT; i2++) {
      for (var j2 = 0; j2 < BOARD_SIZE.WIDTH; j2++) {
        normalized_board0[i2 * 10 - 35][j2 * 10 - 35] = board[0][i2][j2];
      }
    }

  };

  var Board0SigmaAndUnNormalize = function() {

    var x;
    var y;
    var _x;
    var _y;
    var __x;
    var __y;

    var board0string = [];

    for (var i = 0; i < BOARD_SIZE.HEIGHT; i++) {
      for (var j = 0; j < BOARD_SIZE.WIDTH; j++) {
	x = i * 10 - 35;
        y = j * 10 - 35;
	_x = -y;
	_y = x;
	__x = (_x + 35) / 10;
	__y = (_y + 35) / 10;
	board[0][__x][__y] = normalized_board0[x][y];
      }
    }
/*
    for(var n = 0; n < BOARD_SIZE.HEIGHT; n++) {
      alert((n + 1) + "行目");
      board0string[n] = "";
      for(var m = 0; m < BOARD_SIZE.WIDTH; m++) {
	board0string[n] = board0string[n] + board[0][m][n];
      }
      alert(board0string[n]);
    }
*/
  };

  var ReadAndPlay2 = function() {

      //player_color = player_color0;
      //player_color_array[0] = player_color0;
 
     transform_saved_temp_hand = temp_hand;

     player_color = player_color_array[0];
     //player_color_array[0] = 1;

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
	  hand_flag = false;
          for_jump_temp_hand = 0;

          // start game
	  // トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが空の場合
          showBoard(last_hand);

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
	      //alert("i = " + i);
	      if (i == 0) {
		temp_handd = 0;
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
                hand_flag = false;
                for_jump_temp_hand = 0;

                // start game
                // トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが１手目で不正だった場合 
                showBoard(last_hand);
	      }
	      break;
            }
            _x = n;
            _y = kifu.charAt(i + 1) - 1;
	    if (!is07Number(_y)) {
	      invalid_flag = true;
	      //alert("i = " + i);
              if (i == 0) {
		temp_handd = 0;
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
                hand_flag = false;
                for_jump_temp_hand = 0;

                // start game
                // トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが１手目で不正だった場合
                showBoard(last_hand);
	      }
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
	      hand_flag = false;
	　　　
              
              //start game
              //トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが空でない場合
	      showBoard(last_hand);


	    } else {
	      //alert((temp_handd + 1) + "手目が不正です。hasamenai ");
              invalid_flag = true;
	      break i_loop;
	    }	 
          }
          if (invalid_flag == true ) {
            alert((temp_handd + 1) +  "手目が不正です。switch");
          }	  
/*          $('#text0').val(gon.comment0);
	  $('#text1').val(gon.comment1);
	  $('#text2').val(gon.comment2);
          $('#text3').val(gon.comment3);
          $('#text4').val(gon.comment4);
          $('#text5').val(gon.comment5);
          $('#text6').val(gon.comment6);
          $('#text7').val(gon.comment7);
	  $('#text8').val(gon.comment8);
          $('#text9').val(gon.comment9);
          $('#text10').val(gon.comment10);
          $('#text11').val(gon.comment11);
          $('#text12').val(gon.comment12);
          $('#text13').val(gon.comment13);
          $('#text14').val(gon.comment14);
          $('#text15').val(gon.comment15);
          $('#text16').val(gon.comment16);
          $('#text17').val(gon.comment17);
          $('#text18').val(gon.comment18);
          $('#text19').val(gon.comment19);
	  $('#text20').val(gon.comment20);
          $('#text21').val(gon.comment21);
          $('#text22').val(gon.comment22);
          $('#text23').val(gon.comment23);
          $('#text24').val(gon.comment24);
          $('#text25').val(gon.comment25);
          $('#text26').val(gon.comment26);
          $('#text27').val(gon.comment27);
          $('#text28').val(gon.comment28);
          $('#text29').val(gon.comment29);
	  $('#text30').val(gon.comment30);
          $('#text31').val(gon.comment31);
          $('#text32').val(gon.comment32);
          $('#text33').val(gon.comment33);
          $('#text34').val(gon.comment34);
          $('#text35').val(gon.comment35);
          $('#text36').val(gon.comment36);
          $('#text37').val(gon.comment37);
          $('#text38').val(gon.comment38);
          $('#text39').val(gon.comment39);
	  $('#text40').val(gon.comment40);
          $('#text41').val(gon.comment41);
          $('#text42').val(gon.comment42);
          $('#text43').val(gon.comment43);
          $('#text44').val(gon.comment44);
          $('#text45').val(gon.comment45);
          $('#text46').val(gon.comment46);
          $('#text47').val(gon.comment47);
          $('#text48').val(gon.comment48);
          $('#text49').val(gon.comment49);
	  $('#text50').val(gon.comment50);
          $('#text51').val(gon.comment51);
          $('#text52').val(gon.comment52);
          $('#text53').val(gon.comment53);
          $('#text54').val(gon.comment54);
          $('#text55').val(gon.comment55);
          $('#text56').val(gon.comment56);
          $('#text57').val(gon.comment57);
          $('#text58').val(gon.comment58);
          $('#text59').val(gon.comment59);
	  $('#text60').val(gon.comment60);
          $('#text61').val(gon.comment61);
          $('#text62').val(gon.comment62);
          $('#text63').val(gon.comment63);
          $('#text64').val(gon.comment64);*/


//    if (!(beginning_flag == true || end_flag == true || link_flag == true)) {
//      if (temp_hand == previous_temp_hand + 1 || temp_hand == previous_temp_hand - 1) {
//        if (from_saved_first_flag == false) {
//          if (cancel_flag == false) {
//            $("#a" + previous_temp_hand).unwrap();
//          }
//        }
//      }
//    }
          cancel_flag = true;
          //alert("temp_hand = " + temp_hand);
          //alert("previous_temp_hand = " + previous_temp_hand);
	  //alert("from_saved_first_flag = " + from_saved_first_flag);
          //alert("cancel_flag = " + cancel_flag);
          
          $("#a" + last_hand).unwrap();   
	  
	  temp_hand = transform_saved_temp_hand;
          $("#a" + temp_hand).unwrap();   
          player_color = player_color_array[temp_hand];  
	  showBoard(temp_hand); 
        } 

  };	  

  var ReadAndPlay1 = function() {

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
	  hand_flag = false;
          for_jump_temp_hand = 0;

          // start game
	  // トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが空の場合
          showBoard(last_hand);

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
	      //alert("i = " + i);
	      if (i == 0) {
		temp_handd = 0;
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
                hand_flag = false;
                for_jump_temp_hand = 0;

                // start game
                // トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが１手目で不正だった場合 
                showBoard(last_hand);
	      }
	      break;
            }
            _x = n;
            _y = kifu.charAt(i + 1) - 1;
	    if (!is07Number(_y)) {
	      invalid_flag = true;
	      //alert("i = " + i);
              if (i == 0) {
		temp_handd = 0;
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
                hand_flag = false;
                for_jump_temp_hand = 0;

                // start game
                // トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが１手目で不正だった場合
                showBoard(last_hand);
	      }
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
	      hand_flag = false;
	　　　
              
              //start game
              //トップページで盤面編集を選ばず、ファイルから開いた場合でkifuが空でない場合
	      showBoard(last_hand);


	    } else {
	      //alert((temp_handd + 1) + "手目が不正です。hasamenai ");
              invalid_flag = true;
	      break i_loop;
	    }	 
          }
          if (invalid_flag == true ) {
            alert((temp_handd + 1) +  "手目が不正です。switch");
          }	  
          $('#text0').val(gon.comment0);
	  $('#text1').val(gon.comment1);
	  $('#text2').val(gon.comment2);
          $('#text3').val(gon.comment3);
          $('#text4').val(gon.comment4);
          $('#text5').val(gon.comment5);
          $('#text6').val(gon.comment6);
          $('#text7').val(gon.comment7);
	  $('#text8').val(gon.comment8);
          $('#text9').val(gon.comment9);
          $('#text10').val(gon.comment10);
          $('#text11').val(gon.comment11);
          $('#text12').val(gon.comment12);
          $('#text13').val(gon.comment13);
          $('#text14').val(gon.comment14);
          $('#text15').val(gon.comment15);
          $('#text16').val(gon.comment16);
          $('#text17').val(gon.comment17);
          $('#text18').val(gon.comment18);
          $('#text19').val(gon.comment19);
	  $('#text20').val(gon.comment20);
          $('#text21').val(gon.comment21);
          $('#text22').val(gon.comment22);
          $('#text23').val(gon.comment23);
          $('#text24').val(gon.comment24);
          $('#text25').val(gon.comment25);
          $('#text26').val(gon.comment26);
          $('#text27').val(gon.comment27);
          $('#text28').val(gon.comment28);
          $('#text29').val(gon.comment29);
	  $('#text30').val(gon.comment30);
          $('#text31').val(gon.comment31);
          $('#text32').val(gon.comment32);
          $('#text33').val(gon.comment33);
          $('#text34').val(gon.comment34);
          $('#text35').val(gon.comment35);
          $('#text36').val(gon.comment36);
          $('#text37').val(gon.comment37);
          $('#text38').val(gon.comment38);
          $('#text39').val(gon.comment39);
	  $('#text40').val(gon.comment40);
          $('#text41').val(gon.comment41);
          $('#text42').val(gon.comment42);
          $('#text43').val(gon.comment43);
          $('#text44').val(gon.comment44);
          $('#text45').val(gon.comment45);
          $('#text46').val(gon.comment46);
          $('#text47').val(gon.comment47);
          $('#text48').val(gon.comment48);
          $('#text49').val(gon.comment49);
	  $('#text50').val(gon.comment50);
          $('#text51').val(gon.comment51);
          $('#text52').val(gon.comment52);
          $('#text53').val(gon.comment53);
          $('#text54').val(gon.comment54);
          $('#text55').val(gon.comment55);
          $('#text56').val(gon.comment56);
          $('#text57').val(gon.comment57);
          $('#text58').val(gon.comment58);
          $('#text59').val(gon.comment59);
	  $('#text60').val(gon.comment60);
          $('#text61').val(gon.comment61);
          $('#text62').val(gon.comment62);
          $('#text63').val(gon.comment63);
          $('#text64').val(gon.comment64);
        } 
 
  
  };



})();

