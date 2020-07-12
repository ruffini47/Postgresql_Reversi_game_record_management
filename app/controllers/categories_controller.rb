class CategoriesController < ApplicationController
  before_action :set_parents, only: [:new]

  def new
    @parents = Category.where(ancestry: nil)
    @children = Category.find(params[:parent_id]).children
    respond_to do |format|
      format.html
      format.json
    end
  end
end
