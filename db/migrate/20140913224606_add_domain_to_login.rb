class AddDomainToLogin < ActiveRecord::Migration
  def change
    add_column :logins, :domain, :string
  end
end
