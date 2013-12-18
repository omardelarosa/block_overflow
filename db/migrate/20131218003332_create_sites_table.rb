class CreateSitesTable < ActiveRecord::Migration
  def up
    create_table :sites do |t|

      t.string  :student_name
      t.string  :url
      t.text    :description

      t.timestamps

    end
  end

  def down
    drop_table :sites
  end
end
