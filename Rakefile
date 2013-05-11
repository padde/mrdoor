require 'securerandom'

desc 'Generate cache.manifest file'
task :cache do
  File.open('public/cache.manifest', 'w') do |f|
    f.write <<-EOS
CACHE MANIFEST

# automatically generated string to force reload
# #{SecureRandom.base64}

#{`git ls-files --full-name public | grep -v '.manifest$' | sed 's/^public//'`.chomp}

NETWORK:
*
    EOS
  end
end
