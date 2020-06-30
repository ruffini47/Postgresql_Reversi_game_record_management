require 'test_helper'

class SaveSearchedGameRecordControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get save_searched_game_record_update_url
    assert_response :success
  end

end
