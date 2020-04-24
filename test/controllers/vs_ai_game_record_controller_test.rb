require 'test_helper'

class VsAiGameRecordControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get vs_ai_game_record_new_url
    assert_response :success
  end

end
