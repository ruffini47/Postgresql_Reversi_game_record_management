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

  var isComputer = false;
  var isFirst = false;
  var isFinished = false;


  var stone;
  var board = [];
  var player_color;

  var record = [];
  var alphabet ="abcdefgh";
  var kihu_record;  
  var play_back_flag = false;
  var from_saved;

  var pos;

  var getCountIsPossibleToTurnOver = function(x, y, dx, dy) {

    var count = 0;
    var cx = x + dx;
    var cy = y + dy;

    if (( cx < 0 || BOARD_SIZE.WIDTH < cx) ||
      ( cy < 0 || BOARD_SIZE.HEIGHT < cy)) {

      return 0;
    }

    while(board[cx][cy] == BLOCK_KIND.MAX - player_color) {
      count++;
      cx += dx;
      cy += dy;

      if (( cx < 0 || BOARD_SIZE.WIDTH < cx) ||
        ( cy < 0 || BOARD_SIZE.HEIGHT < cy)) {

        return 0;
      }
    }

    if (count > 0 && board[cx][cy] == player_color) {
      return count;
    }

    return 0;
  };

  var turnOverStraight = function(x, y, dx, dy) {

    var cx = x + dx;
    var cy = y + dy;

    while(board[cx][cy] == BLOCK_KIND.MAX - player_color) {
      board[cx][cy] = player_color;
      cx += dx;
      cy += dy;
    }
  };

  var turnOverBlock = function(x, y, flip) {

    var total = 0;

    // can not put block
    if (board[x][y] != BLOCK_KIND.NONE) {
      return total;
    }
    
    // check for 8 direction whether it is possible to turn over block
    for (var dx = -1; dx <= 1; dx++) {
      for(var dy = -1; dy <= 1; dy++) {

        if (dx == 0 && dy == 0) {
          continue;
        }
            
        var cnt = getCountIsPossibleToTurnOver(x, y, dx, dy);
          if (cnt > 0) {
            total += cnt;
            if (flip) {
              turnOverStraight(x, y, dx, dy);
            }
          }
      }
    }

    return total;
  };



  var showBoard = function(only_show) {
    
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
        
	var cell = stone[board[x][y]].cloneNode(true);
                
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

	if(only_show == false) {
          (function() {
            var _x = x;
            var _y = y;
            cell.onclick = function() {
	      //alert("クリックしました。");
              if (turnOverBlock(_x, _y, true) > 0) {
                board[_x][_y] = player_color;
		pos += 2;
	        record.push(alphabet[_x] + (_y + 1).toString());
	        alert(record);
	        showBoard(only_show);
                if (!changePlayer()) {
                  doAiPlayer();
                }
	      }
            };
          })();
	}
      }
    }
    showProgress();    
  };

  var showProgress = function() {

    var black = 0;
    var white = 0;

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        if (board[x][y] == BLOCK_KIND.BLACK) {
          black++;
        } else if (board[x][y] == BLOCK_KIND.WHITE) {
          white++;
        } else {
          // no opereation
        }
      }
    }

    var msg = document.getElementById("msg");
    
    msg.innerHTML = "progress of territory  black:"+black+" white:"+white;

    var msg_kihu_record = document.getElementById("msg_kihu_record");
    msg_kihu_record.innerHTML = record;

    if (allSameColor()) {
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

  var isFinish = function() {

    var finish = true;

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        if (board[x][y] == BLOCK_KIND.NONE) {
	  finish = false;
	}
      }
    }

    return finish;
  };
                 
  var allBlackColor = function() {

    var same = true;     

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        if (board[x][y] == BLOCK_KIND.WHITE) {
	   same =  false;
        }
      }
    }

    return  same;
  };


  var allWhiteColor = function() {

    var same = true;     

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
        if (board[x][y] == BLOCK_KIND.BLACK) {
	   same =  false;
        }
      }
    }

    return  same;
  };



  var allSameColor = function() { 

    return  allBlackColor() || allWhiteColor();

  };

	
  var changePlayer = function() {
    
    var pass = false;

    player_color = BLOCK_KIND.MAX - player_color;

    if (isPass() && !isFinish()) {
      if(player_color == BLOCK_KIND.BLACK) {
        alert("黒の置ける場所がありません。続けて白の番となります。");
      } else if (player_color == BLOCK_KIND.WHITE) {
        alert("白の置ける場所がありません。続けて黒の番となります。");
      } else {
        alert("invalid status");
      }
        
      player_color = BLOCK_KIND.MAX - player_color;

      if(isPass() && !isFinish()) {
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

  var doAiPlayer = function() {

    if(!isComputer) {
      return false;
    }

    if( (isFirst && (player_color == BLOCK_KIND.BLACK)) ||
      (!isFirst && (player_color == BLOCK_KIND.WHITE)) ) {
      return false;
    }

    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {
            
        if (turnOverBlock(x, y, true) > 0) {
          board[x][y] = player_color;
          record.push(alphabet[x] + (y + 1).toString());
          alert(record);
          showBoard(false);
          if(changePlayer()) {
            doAiPlayer();
          }
          return true;
        }
      }
    }
    
    return false;
  };

　var isPass = function() {
   
    for(var y = 0; y < BOARD_SIZE.HEIGHT; y++) {
      for(var x = 0; x < BOARD_SIZE.WIDTH; x++) {    
        if (turnOverBlock(x, y, false)   > 0) {
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

  var kihu_to_record = function(kihu_record, k) {
    var length = kihu_record.length
    var temp_record = [];
    for(j = 0; j <= k; j += 2) {
      temp_record.push(kihu_record.substr(j,2));
    }
    return temp_record;
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
    for (var i = 0; i < BOARD_SIZE.HEIGHT+1; i++) {
      board[i] = [];
      for (var j = 0; j < BOARD_SIZE.WIDTH+1; j++) {
        board[i][j] = BLOCK_KIND.NONE;
      }
    }

    // initial position
    board[3][4] = BLOCK_KIND.BLACK;
    board[4][3] = BLOCK_KIND.BLACK;
    board[3][3] = BLOCK_KIND.WHITE;
    board[4][4] = BLOCK_KIND.WHITE;

  };

  var initRecord = function() {

    // initial record
    record =  [];
  };

  onload = function() {
    // just in case
    Object.freeze(BLOCK_KIND);
    Object.freeze(BOARD_SIZE);
    Object.freeze(FRAME_WIDTH);
    Object.freeze(CELL_WIDTH);
    
    from_saved = gon.from_saved;
 
    // initialize board
    initBoard();
    // start game
    initRecord();
    pos = 0;
    showBoard(true);
  };

  document.getElementById("Play").onclick = function() {
    if(document.form1.Computer.checked) {
      isComputer = true;
    } else {
      isComputer = false;
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
    showBoard(false);
    if(!isFirst) {
      doAiPlayer();
    }
  };

  /*var record1 = $('.title').text();*/
  $("#Save").click(function() {
    /*$('.title').css('color', 'red');*/
    /*$('#result').load('/save_record/update');*/
    kihu_record = record.join('');  
    var record_id = gon.record_id;
    alert(record_id);
    $.ajax({
      url: '/save_record/update',
      type: "GET",
      dataType: "html",
      async: true,
      data: {
        kihu_record: kihu_record,
	record_id: record_id
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
    showBoard(false);
    pos = 0;
    player_color = BLOCK_KIND.BLACK; 
    play_back_flag = true;
   if (from_saved == "true") {
      record = [];
      showProgress();     
      kihu_record = gon.kihu_record;
    } else if(from_saved == "false") {
      kihu_record = record.join('');
    }
  });
        

  $("#next_button").click(function() {
     if (play_back_flag) {
       var n;
       switch(kihu_record.charAt(pos)){
         case 'a':
	   n = 0;
	   break;
         case 'b':
	   n = 1;
	   break;
         case 'c':
	   n = 2;
	   break;
         case 'd':
	   n = 3;
	   break;
         case 'e':
           n = 4;
	   break;
         case 'f':
	   n = 5;
	   break;
         case 'g':
	   n = 6;
	   break;
         case 'h':
           n = 7;
	   break;
       }              
       var _x = n;
       var _y = kihu_record.charAt(pos + 1) - 1;
       if (turnOverBlock(_x, _y, true) > 0) { 
         board[_x][_y] = player_color;
         showBoard(false);
         record = kihu_to_record(kihu_record, pos);
         showProgress(pos);
	 changePlayer();
         pos += 2;
       }
    }
  
  });

  
  $("#previous_button").click(function() {
     if (play_back_flag) {
       initBoard();
       player_color = BLOCK_KIND.BLACK;
       for(i1 = 0; i1 < pos - 2; i1 += 2) {
         var n;
         switch(kihu_record.charAt(i1)){
           case 'a':
	     n = 0;
	     break;
           case 'b':
	     n = 1;
	     break;
           case 'c':
	     n = 2;
	     break;
           case 'd':
	     n = 3;
	     break;
           case 'e':
             n = 4;
	     break;
           case 'f':
	     n = 5;
	     break;
           case 'g':
	     n = 6;
	     break;
           case 'h':
             n = 7;
	     break;
         }              
         var _x = n;
         var _y = kihu_record.charAt(i1 + 1) - 1;
         if (turnOverBlock(_x, _y, true) > 0) { 
           board[_x][_y] = player_color;
           showBoard(false);
           record = kihu_to_record(kihu_record, i1);
           showProgress(i1);
	   changePlayer();
         }
      }
      if(pos != 0) {
	pos -= 2;
      }
      if (pos == 0) {
        initBoard();
        showBoard(false);
        player_color = BLOCK_KIND.BLACK; 
        play_back_flag = true;
      }
    }
  
  });




})();

/*
$(function(){
  $('.title').css('color', 'red');
});
*/
