set :application, 'wordpress-fw'
set :repo_url, 'git@bitbucket.org:weyforth/wordpress-framework.git'

# Branch options
# Prompts for the branch name (defaults to current branch)
#ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Sets branch to current one
#set :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Hardcodes branch to always be master
# This could be overridden in a stage config file
set :branch, :master

set :deploy_to, "/var/www/vhosts/#{fetch(:application)}"

# set :log_level, :info

set :file_permissions_paths, [
  'public/app/uploads',
]

set :to_rename, [
  [ 'public/app/themes/roots/assets/js/vendor/require.min.js', 'public/app/themes/roots/assets/js/vendor/require.js' ],
  [ 'public/app/themes/roots/assets/js/vendor/modernizr.min.js', 'public/app/themes/roots/assets/js/vendor/modernizr.js' ],
  [ 'public/app/themes/roots/assets/js/main.all.min.js', 'public/app/themes/roots/assets/js/main.js' ],
  [ 'public/app/themes/roots/assets/css/main.min.css', 'public/app/themes/roots/assets/css/main.css' ],
]

set :to_delete, [
  'public/app/uploads',
]

set :to_upload, [
  # '.env',
]

set :shared_dirs, [
  'uploads',
]

set :to_link, [
  [ 'uploads', 'public/app/' ],
  [ '.env', '.env' ],
]

namespace :setup do

	task :shared do
		on roles(:all) do
			fetch(:shared_dirs).each do |shared|
				execute "[ -d #{shared_path}/#{shared} ] || mkdir #{shared_path}/#{shared}"
			end
		end
	end

	task :upload do
		on roles(:all) do
			fetch(:to_upload).each do |up|
				upload! "#{up}", "#{shared_path}/#{up}"
			end
		end
	end

	task :link do
		on roles(:all) do
			fetch(:to_link).each do |link|
			execute "ln -s #{shared_path}/#{link[0]} #{release_path}/#{link[1]}"
			end
		end
	end

	task :rename do
		on roles(:all) do
			fetch(:to_rename).each do |rename|
				execute "cd #{release_path} && mv #{rename[0]} #{rename[1]}"
			end
		end
	end

	task :delete do
		on roles(:all) do
			fetch(:to_delete).each do |delete|
				execute "cd #{release_path} && rm -r #{delete}"
			end
		end
	end

	task :composer do
		on roles(:all) do
			execute "cd #{release_path} && composer install --no-dev --prefer-dist --no-interaction --quiet --optimize-autoloader"
		end
	end

	after "deploy:updating", "setup:upload"
	after "deploy:updating", "setup:shared"
	after "deploy:updating", "setup:rename"
	after "deploy:updating", "setup:delete"
	after "deploy:updating", "setup:link"
	after "deploy:updating", "setup:composer"
end