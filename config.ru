$:.unshift File.expand_path(File.dirname(__FILE__))

require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'])

require 'app'

run App.new
