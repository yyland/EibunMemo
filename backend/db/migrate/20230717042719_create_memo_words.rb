class CreateMemoWords < ActiveRecord::Migration[7.0]
  def change
    create_table :memo_words do |t|
      t.references :english_text, null: false, foreign_key: true
      t.text :word
      t.integer :start_position
      t.integer :end_position
      t.boolean :is_momery_list
      t.timestamps
    end
  end
end
