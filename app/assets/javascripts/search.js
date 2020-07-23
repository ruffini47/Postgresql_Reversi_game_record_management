(function() {

  var user_id = gon.user_id;
 
  onload = function() {

    //alert("onload");

    $("#result_button").hide();

  }
  
  
	
	
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
    $("#result_button").show();
    //選択された親カテゴリーの名前取得 → コントローラーに送る
    let parentCategory =  $("#parent_category").val();
    alert("parentCategory = " + parentCategory);
    if (parentCategory != "") {
      $.ajax( {
        type: 'GET',
        url: `/users/{user_id}/books/${parentCategory}/get_category_children`,
        data: {parent_name: parentCategory},
        dataType: 'json',
        success: function(data) {
          alert("success1");
        },
        error: function(data) {
          alert("errror1");
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
      $.ajax({
        url: '/save_category_searched_game_record/update',
        type: "GET",
        dataType: "html",
        async: true,
        data: {id: parentCategory},
        success: function(data) {
          alert("success2");
        },
        error: function(data) {
          alert("errror2");
        }
      });
    }else{
      $("#children_box").empty();
      $("#grandchildren_box").empty();
      $("#result_button").hide();
    }
  });

  //子カテゴリー選択によるイベント発火
  $(document).on('change', '#children_box', function() {
    //選択された子カテゴリーidを取得
    let child_id = $('#children_category option:selected').data('category');
    alert("childId = " + child_id);
    //子カテゴリーが初期値でない場合
    if (child_id != ""){
      $.ajax({
        url: `/users/${user_id}/books/${child_id}/get_category_grandchildren`,
        type: 'GET',
        data: {child_id: child_id},
        datatype: 'json',
        success: function(data) {
          alert("success3");
        },
        error: function(data) {
          alert("errror3");
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
    $.ajax({
        url: '/save_category_searched_game_record/update',
        type: "GET",
        dataType: "html",
        async: true,
        data: {id: child_id},
        success: function(data) {
          alert("success4");
        },
        error: function(data) {
          alert("errror4");
        }
      });
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
        data: {id: grandchildId},
        success: function(data) {
          alert("success5");
        },
        error: function(data) {
          alert("errror5");
        }
      });
    }
  });
})();
