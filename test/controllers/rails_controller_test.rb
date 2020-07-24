require 'test_helper'

class RailsControllerTest < ActionDispatch::IntegrationTest
  test "should get g" do
    get rails_g_url
    assert_response :success
  end

  test "should get controller" do
    get rails_controller_url
    assert_response :success
  end

  test "should get Various_search" do
    get rails_Various_search_url
    assert_response :success
  end

  test "should get new" do
    get rails_new_url
    assert_response :success
  end

end
