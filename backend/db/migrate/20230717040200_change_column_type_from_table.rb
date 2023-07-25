class ChangeColumnTypeFromTable < ActiveRecord::Migration[7.0]
  def change
    change_column :texts, :text, :text
  end
end
