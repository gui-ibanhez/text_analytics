class CreateFreqs < ActiveRecord::Migration[6.0]
  def change
    create_table :freqs do |t|
      t.string :word
      t.integer :qtde
      t.float :perc
      t.integer :anomes
      t.integer :score

      t.timestamps
    end
  end
end
