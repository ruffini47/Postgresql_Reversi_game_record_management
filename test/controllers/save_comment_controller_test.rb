require 'test_helper'

class SaveCommentControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get save_comment_update_url
    assert_response :success
  end

end
