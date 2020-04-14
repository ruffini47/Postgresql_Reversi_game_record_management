class SaveRecordController < ApplicationController
  def update
    @record = params[:record]
  end
end
