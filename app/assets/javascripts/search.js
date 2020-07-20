(function() {

  var user_id = gon.user_id;

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

  var board0 = [];

  // init zero value
  for (var i = 0; i < BOARD_SIZE.HEIGHT+1; i++) {
    board0[i] = [];
    for (var j = 0; j < BOARD_SIZE.WIDTH+1; j++) {
      board0[i][j] = BLOCK_KIND.NONE;
    }
  }

  // initial position
  board0[3][4] = BLOCK_KIND.BLACK;
  board0[4][3] = BLOCK_KIND.BLACK;
  board0[3][3] = BLOCK_KIND.WHITE;
  board0[4][4] = BLOCK_KIND.WHITE;


  function appendOption(category) {
    let html = 
      `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }

  //子カテゴリーのHTML
  function appendChildrenBox(insertHTML) {
    let childSelectHtml = '';
    childSelectHtml =
      `<select class="item_input__body__category__children--select" id="children_category">
         <option value="" data-category="" >選択してください</option>
         ${insertHTML}</select>`;
    $('#children_box').append(childSelectHtml);
  }

  //孫カテゴリーのHTML
  function appendGrandchildrenBox(insertHTML) {
    let grandchildSelectHtml = '';
    grandchildSelectHtml =
      `<select class="item_input__body__category__grandchildren--select" id="grandchildren_category" name="item[category_id]">
         <option value="" data-category="" >選択してください</option>
         ${insertHTML}</select>`;
    $('#grandchildren_box').append(grandchildSelectHtml);
  }

  //親カテゴリー選択によるイベント
  $(document).on("change","#parent_category", function() {
    //選択された親カテゴリーの名前取得 → コントローラーに送る
    let parentCategory =  $("#parent_category").val();
    alert("parentCategory = " + parentCategory);
    if (parentCategory != "") {
      $.ajax( {
        type: 'GET',
        url: `/users/{user_id}/books/${parentCategory}/get_category_children`,
        data: { parent_name: parentCategory,
	        initial_board: board0},
        dataType: 'json',
        success: function(data) {
          alert("success");
        },
        error: function(data) {
          alert("errror");
        }
      })
      .done(function(children) {
        //親カテゴリーが変更されたら、子/孫カテゴリー、サイズを削除し、初期値にする
        $("#children_box").empty();
        $("#grandchildren_box").empty();
        let insertHTML = '';
        children.forEach(function(child) {
          insertHTML += appendOption(child);
        });
        appendChildrenBox(insertHTML);
      })
      .fail(function() {
        alert('error：子カテゴリーの取得に失敗');
      })
    }else{
      $("#children_box").empty();
      $("#grandchildren_box").empty();
    }
  });

  //子カテゴリー選択によるイベント発火
  $(document).on('change', '#children_box', function() {
    //選択された子カテゴリーidを取得
    let childId = $('#children_category option:selected').data('category');
    alert("childId = " + childId);
    //子カテゴリーが初期値でない場合
    if (childId != ""){
      $.ajax({
        url: `/users/${user_id}/books/${childId}/get_category_grandchildren`,
        type: 'GET',
        data: { child_id: childId,
	        initial_board: board0},
        datatype: 'json',
        success: function(data) {
          alert("success");
        },
        error: function(data) {
          alert("errror");
        }
      })
      .done(function(grandchildren) {
        if (grandchildren.length != 0) {
          $("#grandchildren_box").empty();
          let insertHTML = '';
          grandchildren.forEach(function(grandchild) {
            insertHTML += appendOption(grandchild);
          });
          appendGrandchildrenBox(insertHTML);
        }
      })
      .fail(function() {
        alert('error:孫カテゴリーの取得に失敗');
      })
    }else{
      $("#grandchildren_box").empty();
    }
  });

  //孫カテゴリー選択によるイベント発火
  $(document).on('change', '#grandchildren_box', function() {
    let grandchildId = $('#grandchildren_category option:selected').data('category');
    if (grandchildId != "") {
      alert("grand_child_id = " + grandchildId);
      $.ajax({
        url: '/save_category_searched_game_record/update',
        type: "GET",
        dataType: "html",
        async: true,
        data: {
          grand_child_id: grandchildId,
          initial_board: board0},
        success: function(data) {
          alert("success");
        },
        error: function(data) {
          alert("errror");
        }
      });
    }
  });

})();
