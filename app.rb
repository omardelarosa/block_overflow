require 'sinatra'
require 'sinatra/activerecord'
require 'json'

# models
require_relative 'models/site'

set :environment, ENV['RACK_ENV'].to_sym

# database config
require_relative 'config/environments'


get '/' do 
  redirect '/feed'
end

get '/sites' do 
  @sites = Site.all
  erb :index
end

get '/feed' do 
  @sites = Site.all
  erb :feed
end

get '/sites/new' do 
  # @site = Site.new
  erb :instructions
end

get '/sites/json' do
  @sites = Site.all
  @sites_json = @sites.to_json
end

post '/sites/create' do 
  # student_name = params[:student_name]
  # url = params[:url]
  # description = params[:description]

  # Site.create(
  #   student_name: student_name,
  #   url: url,
  #   description: description
  #   )
  redirect "/sites"
end