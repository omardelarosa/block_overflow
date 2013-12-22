class AddLatestPostColumnToSitesTable < ActiveRecord::Migration
  def up
    add_column :sites, :latest_post, :text
  end

  def down
    remove_column :sites, :latest_post
  end
end
