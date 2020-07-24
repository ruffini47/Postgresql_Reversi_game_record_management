require 'test_helper'

class VariousSearchesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get various_searches_new_url
    assert_response :success
  end

end
