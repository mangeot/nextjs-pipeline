BASE_PATH=/mangeot npm run build

BASE_PATH=/mangeot pm2 npm restart --name="nextjs-mangeot"