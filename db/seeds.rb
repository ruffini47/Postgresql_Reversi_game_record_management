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
others = Category.create(:name=>"猫定石")
mouse2 = mouse.children.create(:name=>"鼠定石")
cow_basis = cow.children.create(:name=>"牛基本定石")
bullfight = cow.children.create(:name=>"飛び出し牛定石")
buffalo = cow.children.create(:name=>"バッファロー定石")
snake = cow.children.create(:name=>"蛇定石")
tiger_basis = tiger.children.create(:name=>"虎本定石")
stephenson = tiger.children.create(:name=>"Stephenson")
sharp_rose = rabbit.children.create(:name=>"シャープローズ")
flat_rose = rabbit.children.create(:name=>"フラットローズ")
tezuka_system = rabbit.children.create(:name=>"手塚システム")
mouse2.children.create([{name:"鼠定石基本形"}, {name:"鼠定石最善形"}, {name:"鼠定石 4-f2変化形（旅チュー）"}])
cow_basis.children.create([{name:"牛基本定石・基本形"}, {name:"快速船・基礎形"}, {name:"快速船・最善形"}])
bullfight.children.create([{name:"飛び出し牛・基本形"}, {name:"裏快速船・基本形"}])
buffalo.children.create([{name:"バッファロー定・基本形"}, {name:"丸岡バッファロー・基本形"}]);
snake.children.create([{name:"蛇定石・基本形"}, {name:"砂蛇・基本形"}]);
tiger_basis.children.create([{name:"花形（ローズビル）基本形"}, {name:"酉フック 14-a3型"}])
stephenson.children.create([{name:"コンポス基本形"}, {name:"ノーカン基本形"}])
sharp_rose.children.create([{name:"シャープローズ・基本形"}, {name:"シャープローズ・最善形（＝為則ローズ）"}])
flat_rose.children.create([{name:"フラットローズ・基本形"}, {name:"フラットローズ・13-g5 ローテーション型"}, {name:"フラットローズ・13-g5 ローテーション型 19-e2変化"}])
tezuka_system.children.create([{name:"手塚システム・基本形"}, {name:"手塚システム・黒C打ち型"}])
#sharp_rose_basis = sharp_rose.children.create(:name=>"シャープローズ・基本形")
#sharp_rose_best = sharp_rose.children.create(:name=>"シャープローズ・最善形（＝為則ローズ）")
#flat_rose_basis = flat_rose.children.create(:name=>"フラットローズ・基本形")
#flat_rose_13_g5_rotation = flat_rose.children.create(:name=>"フラットローズ・13-g5 ローテーション型")
#flat_rose_13_g5_rotation_19_e2_change = flat_rose.children.create(:name=>"フラットローズ・13-g5 ローテーション型 19-e2変化");
#tezuka_system_basis = tezuka_system.children.create(:name=>"手塚システム・基本形")
#tezuka_system_black_c = tezuka_system.children.create(:name=>"手塚システム・黒C打ち型")
