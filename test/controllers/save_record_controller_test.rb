require 'test_helper'

class SaveRecordControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get save_record_new_url
    assert_response :success
  end

end
