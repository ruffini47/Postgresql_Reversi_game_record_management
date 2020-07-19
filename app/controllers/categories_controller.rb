class CategoriesController < ApplicationController

#  def edit
#    #カテゴリーデータ取得
#    @grandchild_category = @item.category
#    @child_category = @grandchild_category.parent 
#    @category_parent = @child_category.parent

#    #カテゴリー一覧を作成
#    @category = Category.find(params[:id])
#    # 紐づく孫カテゴリーの親（子カテゴリー）の一覧を配列で取得
#    @category_children = @item.category.parent.parent.children
#    # 紐づく孫カテゴリーの一覧を配列で取得
#    @category_grandchildren = @item.category.parent.children
#  end

  def new
    gon.user_id = current_user.id
    @category_parent_array = Category.where(ancestry: nil)
  end

end

