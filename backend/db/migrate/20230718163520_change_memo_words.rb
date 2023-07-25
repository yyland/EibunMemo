class ChangeMemoWords < ActiveRecord::Migration[7.0]
  def change
    remove_column :memo_words, :text_position, :integer
    add_column :memo_words, :start_position, :integer
    add_column :memo_words, :end_position, :integer
  end
end
