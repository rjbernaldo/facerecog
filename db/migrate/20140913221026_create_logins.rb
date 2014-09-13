class CreateLogins < ActiveRecord::Migration
  def change
    create_table :logins do |t|
      t.belongs_to :user
      t.string :username
      t.string :password
      t.timestamps
    end
  end
end
