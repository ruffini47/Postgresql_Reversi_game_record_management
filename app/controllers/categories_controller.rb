class CategoriesController < ApplicationController
  before_action :set_category, only: [:new, :edit, :create, :update, :destroy]
  before_action :set_item, only: [:show, :edit, :update, :destroy, :purchase, :buy]

  #jsonで親の名前で検索し、紐づく小カテゴリーの配列を取得
  def get_category_children
    @category_children = Category.find(params[:parent_name]).children
  end

  #jsonで子カテゴリーに紐づく孫カテゴリーの配列を取得
  def get_category_grandchildren
    @category_grandchildren = Category.find("#{params[:child_id]}").children
  end

#  private
#  #親カテゴリー
#  def set_category  
#    @category_parent_array = Category.where(ancestry: nil)
#  end

  def item_params
    params.require(:item).permit(
      :category_id,
      :size_id, 
      #省略
      )
  end

  def edit
    #カテゴリーデータ取得
    @grandchild_category = @item.category
    @child_category = @grandchild_category.parent 
    @category_parent = @child_category.parent

    #カテゴリー一覧を作成
    @category = Category.find(params[:id])
    # 紐づく孫カテゴリーの親（子カテゴリー）の一覧を配列で取得
    @category_children = @item.category.parent.parent.children
    # 紐づく孫カテゴリーの一覧を配列で取得
    @category_grandchildren = @item.category.parent.children
  end

  def new
    #gon.user_id = current_user.id
    @category_parent_array = Category.where(ancestry: nil)
    if params[:generation].to_i == 1
      @category_children = Category.find(params[:parent_name]).children
    elsif params[:generation].to_i == 2
      @category_grandchildren = Category.find("#{params[:child_id]}").children
    end
    #@children = Category.find(params[:parent_id]).children
    respond_to do |format|
      format.html
      format.json
    end
  end


  private
  #親カテゴリー
  def set_category  
    @category_parent_array = Category.where(ancestry: nil)
  end

end

