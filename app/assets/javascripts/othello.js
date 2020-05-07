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
  var vsAI = false;

  var stone;
  var board = [];
  var player_color;
  var last_player_color;

  var kifu = "";
  var display_kifu = "";
  var alphabet ="abcdefgh";
  var Alphabet ="ABCDEFGH";

  //var pos;
  var last_hand;
  var temp_hand;
  var snap_shot = [];

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
	      snap_shot[i+1] = board[i+1];
	      if (isPass(i+1) == false) {
		last_player_color = BLOCK_KIND.MAX - player_color;
	      } else {
		last_player_color = player_color;
	      }
	      i++;
	      temp_hand++
	      last_hand = temp_hand;
	      //pos += 2;
	
	      display_kifu = display_kifu.slice(0, 6 + (temp_hand - 1) * 10);
	      kifu = kifu.slice(0, (temp_hand - 1) * 2);
              
	      var number_str;
              if (temp_hand < 10) {
		number_str = " " + temp_hand;
              } else {
		number_str = temp_hand;
	      }
	      if (player_color == BLOCK_KIND.BLACK) {
		kifu = kifu + Alphabet[_x];
	        display_kifu = display_kifu + number_str + ": " + Alphabet[_x];
	      } else if (player_color == BLOCK_KIND.WHITE) {
                kifu = kifu + alphabet[_x];
		display_kifu = display_kifu + number_str + ": " + alphabet[_x];
	      }
              display_kifu = display_kifu + (_y + 1).toString() + "\<br\>"; 
              kifu = kifu + (_y + 1).toString();
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
    
    var kifu_highlight = display_kifu.substring(0, 6 + 10 * (temp_hand -1)) + "<span id='last-msg'><span class='highlight'>" + display_kifu.substring(6 + 10 * (temp_hand - 1), 6 + 10 * temp_hand) + "</span></span>" + display_kifu.substring(6 + 10 * temp_hand, display_kifu.length);   
 
    msg_kifu.innerHTML = kifu_highlight;

    var $box = $($(".link").data("box"));
    var $tareget = $($(".link").attr("href"));
    var dist = $tareget.position().top - $box.position().top;
    $box.stop().animate({
      scrollTop: $box.scrollTop() + dist
    });

    var simple_kifu = document.getElementById("simple_kifu");
    simple_kifu.innerHTML = kifu;

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

    if (isPass(i) && !isFinish(i)) {
      if(player_color == BLOCK_KIND.BLACK) {
        alert("黒の置ける場所がありません。続けて白の番となります。");
      } else if (player_color == BLOCK_KIND.WHITE) {
        alert("白の置ける場所がありません。続けて黒の番となります。");
      } else {
        alert("invalid status 1");
      }
        
      player_color = BLOCK_KIND.MAX - player_color;

      if(isPass(i) && !isFinish(i)) {
        if (allSameColor()) {
          if(player_color == BLOCK_KIND.BLACK) {
            alert("黒のパーフェクト勝ちです。2");
          } else if (player_color == BLOCK_KIND.WHITE) {
            alert("白のパーフェクト勝ちです。2");   
          } else {
            alert("invalid status 2");
          }
        } else {
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
	  snap_shot[i+1] = board[i+1];
          if (isPass(i+1) == false) {
            last_player_color = BLOCK_KIND.MAX - player_color;
          } else {
            last_player_color = player_color;
          }
          i++;
          temp_hand++
          last_hand = temp_hand;
          //pos += 2;
          
          var number_str;
          if (temp_hand < 10) {
            number_str = " " + temp_hand;
          } else {
            number_str = temp_hand;
          }
          if (player_color == BLOCK_KIND.BLACK) {
	    kifu = kifu + Alphabet[x];       	  
            display_kifu = display_kifu + number_str + ": " + Alphabet[x];
          } else if (player_color == BLOCK_KIND.WHITE) {
            kifu = kifu + alphabet[x];
	    display_kifu = display_kifu + number_str + ": " + alphabet[x];
          }
          display_kifu = display_kifu + (y + 1).toString() + "\<br\>";
	  kifu = kifu + (y + 1).toString();

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

    snap_shot[0] = board[0];

  };

  var initRecord = function() {

    // initial kifu
    display_kifu = "開始\<br\>";
    kifu = "";
  };

  onload = function() {
    // just in case
    //Object.freeze(BLOCK_KIND);
    //Object.freeze(BOARD_SIZE);
    //Object.freeze(FRAME_WIDTH);
    //Object.freeze(CELL_WIDTH);

    // initialize board
    initBoard();
    // start game
    initRecord();


    from_saved = gon.from_saved;
    your_move = gon.your_move;
    vsAI = gon.vsAI;
   
    //alert(from_saved);
    //alert(your_move);
    //alert(vsAI);

    if(your_move == "first") {
      isFirst = true;
    } else if(your_move == "second") {
      isFirst = false;
    }

    //alert(isFirst);

    alert("from_saved = " + from_saved);

    if (from_saved == true ) {
      kifu = gon.kifu;
      alert("kifu = " + kifu);
      var n;
      var _x;
      var _y;
      var ii;
      var temp_handd;
      var number_str;
      for (i = 0; i < kifu.length; i+=2) { 
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
         }
         _x = n;
         _y = kifu.charAt(i + 1) - 1;
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
           snap_shot[ii + 1] = board[ii + 1];
           if (isPass(ii + 1) == false) {
             last_player_color = BLOCK_KIND.MAX - player_color;
           } else {
             last_player_color = player_color;
           }
	   
	   ii++;
                
           temp_handd = ii;
	   last_hand = temp_handd;
	
	   display_kifu = display_kifu.slice(0, 6 + (temp_handd - 1) * 10);
              
           if (temp_handd < 10) {
	     number_str = " " + temp_handd;
           } else {
	     number_str = temp_handd;
	   }
	   if (player_color == BLOCK_KIND.BLACK) {
	     display_kifu = display_kifu + number_str + ": " + Alphabet[_x];
	   } else if (player_color == BLOCK_KIND.WHITE) {
	     display_kifu = display_kifu + number_str + ": " + alphabet[_x];
	   }
           display_kifu = display_kifu + (_y + 1).toString() + "\<br\>"; 
           //showBoard(ii);
	   changePlayer(ii);          
	 }       
      }
      
      //last_hand = kifu.length / 2;
      
      for (j = 0; j <= last_hand; j++) {
	board[j] = snap_shot[j];
      }
      
      temp_hand = last_hand;
      
    } else {
               
      //pos = 0;
      last_hand = 0;
      temp_hand = 0;
    }

    showBoard(last_hand);
    if(!from_saved && !isFirst) {
      doAiPlayer(last_hand);
    }

  };


  document.getElementById("Reset").onclick = function() {
    
    // initialize board
    initBoard();
    initRecord();

    if(document.form1.Computer.checked) {
      vsAI = true;
    } else {
      vsAI = false;
    }
    
    if(document.form1.First.checked) {
      isFirst = true;
    } else {
      isFirst = false;
    }
       
    from_saved = "false";

    //pos = 0;
    last_hand = 0;
    temp_hand = 0;
    
    // start game
    showBoard(last_hand);
    if(!isFirst) {
      doAiPlayer(temp_hand);
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

  $("#SaveAs").click(function() {
     
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
	your_move: gon.your_move,
	vsAI: gon.vsAI,
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
    //pos = 0;
    player_color = BLOCK_KIND.BLACK; 
   if (from_saved == "true") {
      kifu = "";
      showProgress();     
      kifu = gon.kifu;
    } else if(from_saved == "false") {
    
    }
  });
        
 
  $("#next_button").click(function() {
    temp_hand++;
    if (temp_hand <= last_hand) {
      changePlayer(temp_hand);
    } else {
      temp_hand = last_hand;
    }
    board[temp_hand] = snap_shot[temp_hand];
    showBoard(temp_hand);
  });
  
  $("#previous_button").click(function() {
    temp_hand--;
    if (temp_hand >= 0) {
      changePlayer(temp_hand);
    } else {
      temp_hand = 0;
    }
    board[temp_hand] = snap_shot[temp_hand];
    showBoard(temp_hand);
  });

  $("#back_to_beginning").click(function() {
    temp_hand = 0;
    board[0] = snap_shot[0]
    player_color = BLOCK_KIND.BLACK;
    showBoard(0);
  });

  $("#go_to_end").click(function() {
    temp_hand = last_hand;
    board[last_hand] = snap_shot[last_hand];
    player_color = last_player_color;
    showBoard(last_hand);
  });




})();

/*
$(function(){
  $('.title').css('color', 'red');
});
*/
