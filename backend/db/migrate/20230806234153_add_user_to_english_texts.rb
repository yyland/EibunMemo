class AddUserToEnglishTexts < ActiveRecord::Migration[7.0]
  def change
    add_reference :english_texts, :user, null: false, foreign_key: true
  end
end
