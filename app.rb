require 'sinatra'
require 'sinatra/activerecord'


# database config
require_relative 'config/environments'

# models
require_relative 'models/site'

set :environment, :development

get '/' do 
  redirect '/feed'
end

get '/sites' do 
  @sites = Site.all
  erb :index
end

get '/feed' do 
  @sites = Site.all
  @posts = []

  @sites.each do |site|
    url = site.url
    doc = HTTParty.get(url)
    doc_noko = Nokogiri::HTML(doc)
    html = doc_noko.css('.block_overflow')[0].to_html
    site_hash = {
      url: url,
      student_name: site.student_name,
      text: html,
    }
    @posts << site_hash
    # @posts << site.url
  end
  erb :feed
end

get '/sites/new' do 
  @site = Site.new
  erb :new
end

post '/sites/create' do 
  student_name = params[:student_name]
  url = params[:url]
  description = params[:description]

  Site.create(
    student_name: student_name,
    url: url,
    description: description
    )
  redirect "/sites"
end