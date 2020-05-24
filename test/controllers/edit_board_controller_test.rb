require 'test_helper'

class EditBoardControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get edit_board_new_url
    assert_response :success
  end

end
