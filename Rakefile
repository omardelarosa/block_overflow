require 'sinatra'
require 'active_record'
require 'sinatra/activerecord'
require "sinatra/activerecord/rake"
require 'httparty'
require 'nokogiri'
require_relative 'models/site'
require_relative 'config/environments'

namespace :sites do 
  desc "# fetches all posts from member sites"
  task :fetch do 
    @sites = Site.all
    @posts = []
    @sites.each do |site|
      url = site.url
      doc = HTTParty.get(url)
      doc_noko = Nokogiri::HTML(doc)
      text = doc_noko.css('.block_overflow')[0]
      if text
        html = text.to_html
      else
        html = "<p>No block_overflow posts found.</p>"
      end
      if site.latest_post != html 
        site.latest_post = html
        site.save!
      end
    end
  end
end

namespace :ping do 
  desc "Pings PING_URL to keep a dyno alive"
  task :self do
    require "net/http"
    if ENV['PING_URL']
      uri = URI(ENV['PING_URL'])
      Net::HTTP.get_response(uri)
    end
  end
end