Sequelize


-------------------------------------------
                Migration
-------------------------------------------


To create migration and model
-------------------------------------------
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string


Create new column 
-------------------------------------------
npx sequelize migration:create --name name_of_your_migration



To run migrations
-----------------------------------------
npx sequelize db:migrate


To undo migrations
-----------------------------------------
npx sequelize db:migrate:undo:all


To undo specific migration
-----------------------------------------
npx sequelize db:migrate:undo --name 20180704124934-create-branch.js
npx sequelize db:migrate:undo:all --to 20190501100413-create-error-logs

To run specific migration with from and to option(From filename will not include)
npx sequelize db:migrate --from from_file_name.js --to to_file_name.js


-------------------------------------------
                Seeder
-------------------------------------------


To create seeder
-----------------------------------------
npx sequelize seed:generate --name demo-user


To seed all data
-----------------------------------------
npx sequelize db:seed:all



To seed particular file data
-----------------------------------------
npx sequelize db:seed --seed  name-of-seed-file



To undo all seed data
-----------------------------------------
npx sequelize db:seed:undo:all



To undo specific seed
-----------------------------------------
npx sequelize db:seed:undo --seed name-of-seed-file
