# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(name: "Sample User",
             email: "sample@email.com",
             password: "password",
             password_confirmation: "password",
	     admin: true)

40.times do |n|
  name  = Faker::Name.name
  email = "sample-#{n+1}@email.com"
  password = "password"
  User.create!(name: name,
               email: email,
               password: password,
               password_confirmation: password)
end

mouse = Category.create(:name=>"鼠定石")
cow = Category.create(:name=>"牛定石")
tiger = Category.create(:name=>"虎定石")
rabbit = Category.create(:name=>"兎定石")
others = Category.create(:name=>"その他")
mouse_basis = mouse.children.create(:name=>"鼠本定石")
cow_basis = cow.children.create(:name=>"牛本定石")
bullfight = cow.children.create(:name=>"闘牛定石")
snake = cow.children.create(:name=>"蛇定石")
buffalo = cow.children.create(:name=>"バッファロー定石")
tiger_basis = tiger.children.create(:name=>"虎本定石")
stephenson = tiger.children.create(:name=>"Stephenson")
sharp_rose = rabbit.children.create(:name=>"シャープローズ")
flat_rose = rabbit.children.create(:name=>"フラットローズ")
tezuka_system = rabbit.children.create(:name=>"手塚システム")
sharp_rose_basis = sharp_rose.children.create(:name=>"シャープローズ・基本形")
sharp_rose_best = sharp_rose.children.create(:name=>"シャープローズ・最善形（＝為則ローズ）")
flat_rose_basis = flat_rose.children.create(:name=>"フラットローズ・基本形")
flat_rose_13_g5_rotation = flat_rose.children.create(:name=>"フラットローズ・13-g5 ローテーション型")
flat_rose_13_g5_rotation_19_e2_change = flat_rose.children.create(:name=>"フラットローズ・13-g5 ローテーション型 19-e2変化");

