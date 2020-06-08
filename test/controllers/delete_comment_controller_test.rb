require 'test_helper'

class DeleteCommentControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get delete_comment_update_url
    assert_response :success
  end

end
