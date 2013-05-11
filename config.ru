require 'bundler/setup'
require 'sinatra'

configure :production do
  require 'newrelic_rpm'
end

get '/' do 
  redirect '/index.html'
end

run Sinatra::Application
