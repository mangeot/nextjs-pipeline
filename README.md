This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Modif de code pour déploiement
- modifier le fichier next.config.mjs en ajoutant le BASE_PATH
```
const nextConfig = {
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || '',
  },
  basePath: process.env.BASE_PATH || '',

};
```

- modifier les chemins vers les images des pages app/page.tsx pen ajoutant le BASE_PATH:
```
 src={`${process.env.BASE_PATH}/vercel.svg`}
```

- modifier le package.json 
```
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 3333",
```

## Déploiement sur un serveur perso
- se connecter par ssh au serveur xxxx.fr
```
 ssh -p yyyy login@xxxx.fr
```
- générer sa clé ssh
```
 ssh-keygen
```
- ajouter sa clé ssh publique dans vos clés github
 fichier : .ssh/id_rsa.pub
- cloner son projet
```
 git clone git@github.com:login/monprojetnextjs.git
 cd monprojetnextjs
```

- installer l'appli avec la commande suivante
```
 npm install
```

- compiler l'appli avec la commande suivante
```
 BASE_PATH=/mangeot npm run build
```

- lancer une première fois l'appli avec la commande suivante
```
 BASE_PATH=/mangeot npm run start
```
puis arrêter l'appli avec control+C

- relancer l'appli avec la commande suivante 
```
 BASE_PATH=/mangeot pm2 start npm --name="nextjs-login" -- start
```

- Puis quand l'appli tourne déjà, relancer l'appli avec la commande suivante 
```
 pm2 restart nextjs-login
```

## pipeline github
- ajouter un script de déploiement dans scripts/deploy.sh
```
BASE_PATH=/mangeot npm run build
BASE_PATH=/mangeot pm2 restart nextjs-login
```
chmod 755 deploy.sh

- ajouter une action github
```
 name: Deploy to Server

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy to Server
    runs-on: ubuntu-latest

    steps:
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.5.4
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: SSH into Server and Deploy
        run: |
          ssh -o StrictHostKeyChecking=no -p ${{ secrets.SSH_PORT }} ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} \
          "cd ${{ secrets.WORK_DIR }} && \
          git fetch origin main && \
          git reset --hard origin/main && \
          ./scripts/deploy.sh"
```

- ajouter tous les secrets d'environnement pour le repository
````
SSH_HOST=xxxx
SSH_PORT=yyyy
SSH_USER=login
WORK_DIR=/home/login/nextjs-pipeline
SSH_PRIVATE_KEY= le fichier id_rsa dans votre .ssh
````


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
