class SaveRecordController < ApplicationController
  def update
    record = params[:record]
    record_id = params[:record_id]
    @record = Record.find(record_id)
    @record.record = record
    @record.save
  end
end
