require 'test_helper'

class SpecifyKifuAndOpenControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get specify_kifu_and_open_new_url
    assert_response :success
  end

end
