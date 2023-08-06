class CreateMemos < ActiveRecord::Migration[7.0]
  def change
    create_table :memos do |t|
      t.references :memo_word, null: false, foreign_key: true
      t.text :body
      t.timestamps
    end
  end
end
