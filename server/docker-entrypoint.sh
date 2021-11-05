dockerize -wait tcp://mysql:3306 -timeout 20s

# echo "DB Migrations"
# npx sequelize db:create
# npx sequelize-cli db:migrate
# npx sequelize-cli db:seed:all

echo "Start server"
npm run start