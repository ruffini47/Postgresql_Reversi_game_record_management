require 'test_helper'

class VsAiConfigrationControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get vs_ai_configration_new_url
    assert_response :success
  end

end
