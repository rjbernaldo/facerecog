# Create a fake user for our test person

User.create(
  uniquename: "Martin1",
  email: "martin@martin.com",
  password: "martin"
  )

User.create(
  uniquename: "Amol",
  email: "amol@amol.com",
  password: "amol"
  )

10.times do
  Login.create(
    user_id: 1,
    domain: Faker::Internet.url,
    username: Faker::Internet.user_name,
    password: Faker::Internet.password
    )
end

10.times do
  Login.create(
    user_id: 2,
    domain: Faker::Internet.url,
    username: Faker::Internet.user_name,
    password: Faker::Internet.password
    )
end