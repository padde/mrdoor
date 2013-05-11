$:.unshift File.expand_path(File.dirname(__FILE__))

require 'bundler/setup'
require 'sinatra'

require 'app'

require 'newrelic_rpm'
NewRelic::Agent.after_fork(:force_reconnect => true)

run App.new
