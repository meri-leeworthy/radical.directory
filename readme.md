so in terms of deploying this thing

- Setting a session secret environment variable, is important. I used a randomly generated 504-bit WPA Key and saved it as an encrypted env variable on digitalocean app platform
- I think the DOAP build script should be `yarn build && yarn keystone-next prisma migrate deploy` (note: it currently just says `yarn build` and we are doing the `migrate deploy`s manually)
- on that topic, the keystone docs say "Note: it is only safe to run migrations in the build step if deploys are built synchronously by your hosting provider. Make sure you don't run migrations against your production database from staging / preview builds." I think, if I understand this sentence correctly, that DOAP meets this criteria and does build deploys syncronously (I'm not sure what that would be opposed to?)

HOW TO CHANGE THE SCHEMA USING KEYSTONE + PRISMA

- edit the schema config in schema.ts
- run yarn dev which will auto-update the GraphQL and Prisma schemas, then create a Prisma migration
- give the migration a name, apply it to your dev db if you want
- commit the resulting files to git and push
- once the build and deploy process is finished on DigitalOcean, go into the console and run yarn keystone-next prisma migrate deploy (this step might be able to be automated - i will experiment and report back)
- done!
