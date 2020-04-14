class SaveRecordController < ApplicationController
  def update
    @kihu_record = params[:record]
    record_id = params[:record_id]
    record = Record.find(record_id)
  end
end
