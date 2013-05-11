require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'])

use Rack::Rewrite do
  rewrite '/', '/index.html'
end

run Rack::Directory.new('public')
