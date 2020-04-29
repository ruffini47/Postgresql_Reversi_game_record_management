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

  var SLEEP_KIND = {
    'TURNOVER' : 1000,
  };

  var isFirst = false;
  var isFinished = false;

  var from_saved = false;
  var your_move = "second";
  var isComputer = "false";

  var stone;
  var board = [];
  var player_color;

  var kifu = "";
  var alphabet ="abcdefgh"; 

  var pos;
  var last_hand;
  var temp_hand;
  var snap_shot = [];
  var flag;     

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



  var showBoard = function(i) {
    
    //alert("temp_hand1 = " + temp_hand); 	  
    //alert("hand_flag1 = " + hand_flag);

    //if(hand_flag == false) {
    //  temp_hand++;
    //}
    //alert("temp_hand1 = " + temp_hand);
    i = temp_hand;    

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
	    //alert("i2 = " + i);
	    if (hand_flag == false) {
	      for(var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++) {
                for(var xx = 0; xx < BOARD_SIZE.WIDTH; xx++) {
                  board[i+1][xx][yy] = board[i][xx][yy];
                }
              }
	      //for(var xx = 0; xx < BOARD_SIZE.WIDTH; xx++) {
              //  alert("board[" + i + "][" + xx + "]=" + board[i][xx]);
              //}
	      i++;
	      temp_hand++;
	      //for(var xx = 0; xx < BOARD_SIZE.WIDTH; xx++) {
	      //	alert("board[" + i + "][" + xx + "]=" + board[i][xx]);
	      //}
	      //if (!changePlayer(i)) {
              //  doAiPlayer(i);
	      //}
	    }
	    if (turnOverBlock(i, _x, _y, true) > 0) {
	      board[i][_x][_y] = player_color;
	      if (i == 0) {
	        snap_shot[i] = board[i];
	      }
	      for(var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++) {
                for(var xx = 0; xx < BOARD_SIZE.WIDTH; xx++) {
                  board[i+1][xx][yy] = board[i][xx][yy];
                }
              }
	      //alert("i3 = " + i);
	      i++;
	      //alert("i3 = " + i);
	      snap_shot[i] = board[i];
	      //alert("temp_hand3 = " + temp_hand);
	      last_hand++;
	      temp_hand++;
	      //alert("temp_hand3 = " + temp_hand);
	      pos += 2;
	      kifu = kifu + alphabet[_x];
              kifu = kifu + (_y + 1).toString();
	      //alert(i);
	      hand_flag = true;
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

    var msg = document.getElementById("msg");
    
    msg.innerHTML = "progress of territory  black:"+black+" white:"+white;

    var msg_kifu = document.getElementById("msg_kifu");
    msg_kifu.innerHTML = kifu;

    if (allSameColor(i)) {
      if(player_color == BLOCK_KIND.BLACK) {
        alert("黒のパーフェクト勝ちです。1");
      } else if (player_color == BLOCK_KIND.WHITE) {
        alert("白のパーフェクト勝ちです。1");   
      } else {
        alert("invalid status");
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

    if (isPass(i) && !isFinish(i)) {
      if(player_color == BLOCK_KIND.BLACK) {
        alert("黒の置ける場所がありません。続けて白の番となります。");
      } else if (player_color == BLOCK_KIND.WHITE) {
        alert("白の置ける場所がありません。続けて黒の番となります。");
      } else {
        alert("invalid status");
      }
        
      player_color = BLOCK_KIND.MAX - player_color;

      if(isPass(i) && !isFinish(i)) {
        if (allSameColor()) {
          if(player_color == BLOCK_KIND.BLACK) {
            alert("黒のパーフェクト勝ちです。2");
          } else if (player_color == BLOCK_KIND.WHITE) {
            alert("白のパーフェクト勝ちです。2");   
          } else {
            alert("invalid status");
          }
        } else {
	  if(player_color == BLOCK_KIND.BLACK) {
            alert("黒も置ける場所がありません。試合終了です。");
          } else if (player_color == BLOCK_KIND.WHITE) {
            alert("白も置ける場所がありません。試合終了です。");
          } else {
            alert("invalid status");
          }
        }
	
        isFinished = true;
      }

      pass = true;
    }

    return pass;
  };

  var doAiPlayer = function(i) {

    i = temp_hand;

    if(isComputer == "false") {
      return false;
    }

    if( (isFirst && (player_color == BLOCK_KIND.BLACK)) ||
      (!isFirst && (player_color == BLOCK_KIND.WHITE)) ) {
      return false;
    }

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        if (turnOverBlock(i, x, y, true) > 0) {
	  board[i][x][y] = player_color;
	  if (i == 0) {
	    snap_shot[i] = board[i];
	  }
	  for(var yy = 0; yy < BOARD_SIZE.HEIGHT; yy++) {
            for(var xx = 0; xx < BOARD_SIZE.WIDTH; xx++) {
	      board[i + 1][xx][yy] = board[i][xx][yy];
            }
          }
	  i++;
          snap_shot[i] = board[i];
          last_hand++;
	  temp_hand++;
	  kifu = kifu + alphabet[x] 
          kifu = kifu + (y + 1).toString();
          showBoard(i);
          if(changePlayer(i)) {
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

    player_color = BLOCK_KIND.BLACK;

    // 0:石無し, 1:黒, 2:白
    dot =
      document.getElementById("dot");
    corner =
      document.getElementById("corner");
    side_frame = 
      document.getElementById("side_frame");
    vertical_frame =
      document.getElementById("vertical_frame");
    stone = [
      document.getElementById("cell"),
      document.getElementById("black"),
      document.getElementById("white")
    ];
 
    // init zero value
    for(var k = 0; k < 64; k++) {
      board[k] = [];
      for (var i = 0; i < BOARD_SIZE.HEIGHT+1; i++) {
        board[k][i] = [];
        for (var j = 0; j < BOARD_SIZE.WIDTH+1; j++) {
          board[k][i][j] = BLOCK_KIND.NONE;
        }
      }
    }

    // initial position
    for(var k = 0; k < 64; k++) {
      board[k][3][4] = BLOCK_KIND.BLACK;
      board[k][4][3] = BLOCK_KIND.BLACK;
      board[k][3][3] = BLOCK_KIND.WHITE;
      board[k][4][4] = BLOCK_KIND.WHITE;
    }

    //snap_shot[0] = board[0];     

  };

  var initRecord = function() {

    // initial kifu
    kifu = "";
  };

  onload = function() {
    // just in case
    Object.freeze(BLOCK_KIND);
    Object.freeze(BOARD_SIZE);
    Object.freeze(FRAME_WIDTH);
    Object.freeze(CELL_WIDTH);
    
    from_saved = gon.from_saved;
    your_move = gon.your_move;
    isComputer = gon.isComputer;
   
    //alert(from_saved);
    //alert(your_move);
    //alert(isComputer);

    if(your_move == "first") {
      isFirst = true;
    } else if(your_move == "second") {
      isFirst = false;
    }

    //alert(isFirst);

    //alert(from_saved);

    pos = 0;
    last_hand = 0;
    temp_hand = 0;
    hand_flag = true;

    // initialize board
    initBoard();
    // start game
    initRecord();
    
    
    showBoard(last_hand);
    if(!from_saved && !isFirst) {
      doAiPlayer(last_hand);
    }
  };

  document.getElementById("Play").onclick = function() {
    if(document.form1.Computer.checked) {
      isComputer = "true";
    } else {
      isComputer = "false";
    }
    
    if(document.form1.First.checked) {
      isFirst = true;
    } else {
      isFirst = false;
    }

    // initialize board
    initBoard();
    initRecord();         
    from_saved = "false";
    // start game
    showBoard();
    if(!isFirst) {
      doAiPlayer();
    }
  };

  /*var kifu1 = $('.title').text();*/
  $("#Save").click(function() {
    /*$('.title').css('color', 'red');*/
    /*$('#result').load('/save_game_record/update');*/
    var game_record_id = gon.game_record_id;
    alert(game_record_id);
    $.ajax({
      url: '/save_game_record/update',
      type: "GET",
      dataType: "html",
      async: true,
      data: {
        kifu: kifu,
	game_record_id: game_record_id
      },
      success: function(data) {
        alert("success");
      },
      error: function(data) {
        alert("errror");
      }
    });
  });

  $("#play_back").click(function() {
    initBoard();
    showBoard();
    pos = 0;
    player_color = BLOCK_KIND.BLACK; 
   if (from_saved == "true") {
      kifu = "";
      showProgress();     
      kifu = gon.kifu;
    } else if(from_saved == "false") {
    
    }
  });
        
 
  $("#next_button").click(function() {
    //alert(temp_hand);
    temp_hand++;
    //alert(temp_hand);
    if(temp_hand > last_hand) {
      temp_hand = last_hand;
      alert(temp_hand);
    } else {
    board[temp_hand-1] = snap_shot[temp_hand-1];
    showBoard(temp_hand-1);
    }
  });
  
  $("#previous_button").click(function() {
    //alert("temp_hand4 = " + temp_hand)
    temp_hand--;
    //alert("temp_hand4 = " + temp_hand);
    //alert("hand_flag4 = " + hand_flag);
    if(temp_hand <= 0) {
      temp_hand = 0;
      //alert("temp_hand4 " + temp_hand);
      initBoard();
      showBoard(0);
    } else {
      if(hand_flag == true) {
	 temp_hand--;
      }
      //alert("temp_hand4 = " + temp_hand);
      board[temp_hand] = snap_shot[temp_hand];
      hand_flag = false;
      //alert("hand_flag4 = " + hand_flag);
      changePlayer(temp_hand)
      showBoard(temp_hand);
    }
  });

  $("#back_to_beginning").click(function() {
    temp_hand = 0;
    //alert(temp_hand);
    initBoard();
    showBoard(0);
  });

  $("#go_to_end").click(function() {
    temp_hand = last_hand;
    //alert(temp_hand);
    board[temp_hand] = snap_shot[temp_hand];
    showBoard(temp_hand);
  });




})();

/*
$(function(){
  $('.title').css('color', 'red');
});
*/
