require 'test_helper'

class SaveCategorySearchedGameRecordControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get save_category_searched_game_record_update_url
    assert_response :success
  end

end
