class AddIsInitialDataToEnglishTexts < ActiveRecord::Migration[7.0]
  def change
    add_column :english_texts, :is_initial_data, :boolean
  end
end
