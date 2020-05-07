require 'test_helper'

class SaveAsGameRecordControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get save_as_game_record_new_url
    assert_response :success
  end

end
