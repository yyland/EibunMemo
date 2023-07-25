class CreateMemoWords < ActiveRecord::Migration[7.0]
  def change
    create_table :memo_words do |t|
      t.references :english_text, null: false, foreign_key: true
      t.string :word
      t.integer :text_position
      t.timestamps
    end
  end
end
