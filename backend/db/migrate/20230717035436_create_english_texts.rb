class CreateEnglishTexts < ActiveRecord::Migration[7.0]
  def change
    create_table :english_texts do |t|
      t.text :title
      t.text :body
      t.timestamps
    end
  end
end
