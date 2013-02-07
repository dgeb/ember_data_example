Rake::TestTask.new do |t|
  t.libs << 'lib' << 'test'
  t.test_files = FileList['test/serializers/**/*_test.rb']
  t.verbose = true
end
