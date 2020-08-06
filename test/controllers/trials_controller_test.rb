require 'test_helper'

class TrialsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get trials_create_url
    assert_response :success
  end

end
