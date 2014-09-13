# Create a fake user for our test person

User.create(
  uniquename: "Lleyton_Hewitt_0030.jpg",
  email: "martin@martin.com",
  password: "martin"
  )

10.times do
  Login.create(
    user_id: 1,
    domain: Faker::Internet.url,
    username: Faker::Internet.user_name,
    password: Faker::Internet.password
    )
end