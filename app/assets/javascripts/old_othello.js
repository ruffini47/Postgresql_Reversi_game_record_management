(function() {
  // 変数定義
  var BOARD_TYPE = {
    'WIDTH' :8,
    'HEIGHT':8,
  };

  var PIECE_TYPE = {
    'NONE'   : 0,
    'BLACK'  : 1,
    'WHITE'  : 2,
    'MAX'    : 3,
  };

  var FRAME_WIDTH = 12;
  var CELL_WIDTH = 41;

  var stone;
  var board = [];

  var turn = PIECE_TYPE.BLACK;
  
  var checkTurnOver = function(x, y, flip) {
   
    var ret = 0;
        
    for (var dx = -1; dx <= 1; dx++) {
      for(var dy = -1; dy <= 1; dy++) {
        if (dx == 0 && dy == 0) {
          continue;
        }
            
        var nx = x + dx;
        var ny = y + dy;
        var n = 0;
        while(board[nx][ny] == PIECE_TYPE.MAX - turn) {
          n++;
          nx += dx;
          ny += dy;
        }
                
        if (n > 0 && board[nx][ny] == turn) {
          ret += n;
                    
          if (flip) {
            nx = x + dx;
            ny = y + dy;
                        
            while(board[nx][ny] == PIECE_TYPE.MAX - turn) {
              board[nx][ny] = turn;
              nx += dx;
              ny += dy;
            }
                        
                        
          }
        }
      }
    }
    return ret;
  };
    
  var showBoard = function() {
    
    var b = document.getElementById("board");
        
    while(b.firstChild) {
      b.removeChild(b.firstChild);
    }

    var top_left_corner = corner.cloneNode(true);
    
    top_left_corner.style.left = 0 + "px";
    top_left_corner.style.top = 0 + "px";
    b.appendChild(top_left_corner);

    var top_right_corner = corner.cloneNode(true);

    top_right_corner.style.left = FRAME_WIDTH + (BOARD_TYPE.WIDTH * CELL_WIDTH) + "px";
    top_right_corner.style.top = 0 + "px";
    b.appendChild(top_right_corner);

    var bottom_left_corner = corner.cloneNode(true);

    bottom_left_corner.style.left = 0 + "px";
    bottom_left_corner.style.top = FRAME_WIDTH + (BOARD_TYPE.HEIGHT * CELL_WIDTH) + "px";
    b.appendChild(bottom_left_corner);

    var bottom_right_corner = corner.cloneNode(true);

    bottom_right_corner.style.left = FRAME_WIDTH + (BOARD_TYPE.WIDTH * CELL_WIDTH) + "px";
    bottom_right_corner.style.top = FRAME_WIDTH + (BOARD_TYPE.HEIGHT * CELL_WIDTH) + "px";
    b.appendChild(bottom_right_corner);

    var alphabet ="abcdefgh";
    for(var x = 1; x <=BOARD_TYPE.WIDTH; x++) {
      
      var top_side_frame = side_frame.cloneNode(true);
      
      top_side_frame.style.left = FRAME_WIDTH + ((x - 1)  * CELL_WIDTH) + "px";
      top_side_frame.style.top = 0 + "px";
      top_side_frame.innerText = alphabet[x - 1];
      b.appendChild(top_side_frame);
    }

    for(var x = 1; x <=BOARD_TYPE.WIDTH; x++) {

      var bottom_side_frame = side_frame.cloneNode(true);

      bottom_side_frame.style.left = FRAME_WIDTH + ((x - 1)  * CELL_WIDTH) + "px";
      bottom_side_frame.style.top  = FRAME_WIDTH + (BOARD_TYPE.HEIGHT * CELL_WIDTH) + "px";
      b.appendChild(bottom_side_frame);
    }

    for(var y = 1; y <= BOARD_TYPE.HEIGHT; y++) {
      for(var x = 1; x <= BOARD_TYPE.WIDTH; x++) {

        var left_vertical_frame = vertical_frame.cloneNode(true);

        left_vertical_frame.style.left = 0 + "px";
        left_vertical_frame.style.top = FRAME_WIDTH + ((y - 1) * CELL_WIDTH) + "px";
	left_vertical_frame.innerText = y.toString();
        
        b.appendChild(left_vertical_frame);
      }
    }

    for(var y = 1; y <= BOARD_TYPE.HEIGHT; y++) {
      for(var x = 1; x <= BOARD_TYPE.WIDTH; x++) {

        var right_vertical_frame = vertical_frame.cloneNode(true);

        right_vertical_frame.style.left = FRAME_WIDTH + (BOARD_TYPE.WIDTH * CELL_WIDTH) + "px";
        right_vertical_frame.style.top = FRAME_WIDTH + ((y - 1) * CELL_WIDTH) + "px";
        b.appendChild(right_vertical_frame);
      }
    }

    for(var y = 1; y <= BOARD_TYPE.HEIGHT; y++) {
      for(var x = 1; x <= BOARD_TYPE.WIDTH; x++) {
        
	var cell = stone[board[x][y]].cloneNode(true);
                
        cell.style.left = FRAME_WIDTH + ((x - 1) * CELL_WIDTH) + "px"; 
        cell.style.top = FRAME_WIDTH + ((y - 1) * CELL_WIDTH) + "px"; 
        b.appendChild(cell);

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

        if (board[x][y] == PIECE_TYPE.NONE) {
          (function() {
            var _x = x;
            var _y = y;
            //alert("break point")
            cell.onclick = function() {
              if (checkTurnOver(_x, _y, true) > 0) {
              board[_x][_y] = turn;
              showBoard();
              turn = PIECE_TYPE.MAX - turn;
              }
            };
          })();
        }
      }
    }
        
  };

  onload = function() {
    //alert("hello world!");
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
        
    // PIECE種別の凍結(念のため)
    Object.freeze(PIECE_TYPE);
        
    // 盤面を初期化
    for (var i = 0; i < 10; i++) {
      board[i] = [];
      for (var j = 0; j < 10; j++) {
        board[i][j] = PIECE_TYPE.NONE;
      }
    }
        
    // 黒白の初期配置
    board[4][5] = PIECE_TYPE.BLACK;
    board[5][4] = PIECE_TYPE.BLACK;
    board[4][4] = PIECE_TYPE.WHITE;
    board[5][5] = PIECE_TYPE.WHITE;
        
    // 盤面表示
    showBoard();

    //alert("good bye world!");
  };
})();


