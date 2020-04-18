class SaveRecordController < ApplicationController
  def update
    kihu_record = params[:kihu_record]
    record_id = params[:record_id]
    @record = Record.find(record_id)
    @record.kihu_record = kihu_record
    @record.save
  end
end
