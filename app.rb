require './lib/cache'

set :cache_max_age, 30

get '/status.json' do
  content_type 'text/plain'
  Cache.get 'http://api.maschinenraum.tk/status.json'
end
