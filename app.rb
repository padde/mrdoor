class App < Sinatra::Base
  configure :production do
    require 'newrelic_rpm'
  end

  get '/' do
    redirect '/index.html'
  end
end
