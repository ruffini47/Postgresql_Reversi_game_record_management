class SaveRecordController < ApplicationController
  def update
    kihu_record = params[:kihu_record]
    record_id = params[:record_id]
    @record = Record.find(record_id)
    @record.kihu_record = kihu_record
    gon.kihu_record = "a"
    if @record.save
    else
      flash[:danger] = "#{@record.title}の更新に失敗しました。" + @record.errors.full_message.join("、")
    end

  end
end
