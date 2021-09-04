so in terms of deploying this thing

- Setting a session secret environment variable, is important. I used a randomly generated 504-bit WPA Key and saved it as an encrypted env variable on digitalocean app platform
- I think the DOAP build script should be `yarn && yarn keystone-next build && yarn keystone-next prisma migrate deploy`
- on that topic, the keystone docs say "Note: it is only safe to run migrations in the build step if deploys are built synchronously by your hosting provider. Make sure you don't run migrations against your production database from staging / preview builds." I think, if I understand this sentence correctly, that DOAP meets this criteria and does build deploys syncronously (I'm not sure what that would be opposed to?)
