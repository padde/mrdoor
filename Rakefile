require 'securerandom'

desc 'Generate cache.manifest file'
task :cache do
  File.open('public/cache.manifest', 'w') do |f|
    f.write <<-EOS
CACHE MANIFEST

# automatically generated string to force reload
# #{SecureRandom.hex(8)}

#{`git ls-files --full-name public | sed 's/^public//' | grep -v 'cache.manifest'`.chomp}

NETWORK:
*
    EOS
  end
end

desc 'Generate font awesome css file'
task :font do
  require 'erb'
  require 'base64'
  template = File.read('templates/font-awesome.min.css.erb')
  base64_svg_font = Base64.strict_encode64(File.read('public/fonts/fontawesome-webfont.svg'))
  File.open('public/stylesheets/font-awesome.min.css', 'w') do |f|
    f.write ERB.new(template).result(binding)
  end
end
