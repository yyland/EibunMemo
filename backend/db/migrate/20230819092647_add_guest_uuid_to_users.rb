class AddGuestUuidToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :guest_uuid, :string
  end
end
