require 'open-uri'
require 'digest/sha1'
require 'fileutils'

module Cache
  begin
    settings.cache_dir
  rescue NoMethodError
    set :cache_dir, 'cache'
  end

  begin
    settings.cache_max_age
  rescue NoMethodError
    set :cache_max_age, 3600
  end

  FileUtils.mkdir_p settings.cache_dir

  def self.filename url
    safe_url = url.gsub /[^A-z0-9]/, '_'
    hash = Digest::SHA1.hexdigest(url)
    "#{settings.cache_dir}/#{safe_url}-#{hash}"
  end

  def self.expire url, filename=nil
    filename = Cache.filename(url) unless filename
    content = nil

    File.open filename, 'w' do |file|
      content = open(url).read
      file.write content
    end

    content
  end

  def self.get url, max_age=nil
    max_age = settings.cache_max_age unless max_age
    filename = Cache.filename(url)

    begin
      file = File.new filename, 'r'
    rescue Errno::ENOENT
      return Cache.expire url, filename
    end

    age = Time.now - File.mtime(file)

    if age > max_age
      Cache.expire url, filename
    else
      file.read
    end
  end
end
