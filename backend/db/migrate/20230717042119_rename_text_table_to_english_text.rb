class RenameTextTableToEnglishText < ActiveRecord::Migration[7.0]
  def change
    rename_table :texts, :english_texts
  end
end
