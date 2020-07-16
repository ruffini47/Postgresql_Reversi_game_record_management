$(function() {
  var user_id = gon.user_id;
// 子カテゴリーを追加するための処理です。
  function buildChildHTML(child){

    var html =`<div><a class="child_category" id="${child.id}"
               href="/users/${user_id}/category/${child.id}">${child.name}</a></div>`;

    //var html =`<div><%= link_to "${child.name}", caterogy_path(current_user.id, child.id), {method: :get, id: "${child.id}", class: "child_category"}%></div>`;

    return html;
  }

  $(".parent_category").on("mouseover", function() {
    var id = this.id;//どのリンクにマウスが乗ってるのか取得します
    //alert("user_id = " + user_id);
    //$(".now-selected-red").removeClass("now-selected-red")//赤色のcssのためです
    //$('#' + id).addClass("now-selected-red");//赤色のcssのためです
    $(".child_category").remove();//一旦出ている子カテゴリ消します！
    $(".grand_child_category").remove();//孫、てめえもだ！
    $.ajax({
      type: 'GET',
      url: `/users/${user_id}/category/${id}`,//とりあえずここでは、newアクションに飛ばしてます
      data: {parent_id: id},//どの親の要素かを送ります　params[:parent_id]で送られる
      dataType: 'json'
    }).done(function(children) {
      children.forEach(function (child) {//帰ってきた子カテゴリー（配列）
        var html = buildChildHTML(child);//HTMLにして
        $(".children_list").append(html);//リストに追加します
      })
    });
  });

  // 孫カテゴリを追加する処理です　基本的に子要素と同じです！
  function buildGrandChildHTML(child){
    var html =`<div><a class="grand_child_category" id="${child.id}"
               href="/users/${user_id}/category/${child.id}">${child.name}</a></div>`;
    return html;
  }

  $(document).on("mouseover", ".child_category", function () {//子カテゴリーのリストは動的に追加されたHTMLのため
    var id = this.id;
    //$(".now-selected-gray").removeClass("now-selected-gray");//灰色のcssのため
    //$('#' + id).addClass("now-selected-gray");//灰色のcssのため	  
    $(".grand_child_category").remove();
    $.ajax({
      type: 'GET',
      url: `/users/${user_id}/category/${id}`,
      data: {parent_id: id},
      dataType: 'json'
    }).done(function(children) {
      children.forEach(function (child) {
        var html = buildGrandChildHTML(child);
        $(".grand_children_list").append(html);
      })
      $(document).on("mouseover", ".child_category", function () {
        $(".grand_child_category").remove();
      });
    });
  });

  $(document).on("mouseover", ".grand_child_category", function() {
    var grand_child_id = this.id;
    alert("grand_child_id = " + grand_child_id);
    $.ajax({
      url: '/save_category_searched_game_record/update',
      type: "GET",
      dataType: "html",
      async: true,
      data: {
        grand_child_id: grand_child_id,
      },
      success: function(data) {
        alert("success");
      },
      error: function(data) {
        alert("errror");
      }
    });



  });

});
