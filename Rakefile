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
