
# OSU Times
# Blog Application

## Software Engineers
### Sami Syed


## GIF

## Pictures

### instructions
#### using terminal, git clone https://github.com/saminoorsyed/CS340_ui_api.git
#### using terminal, run npm ci 
#### go to api directory, npm start //Disclosure: .env problem
#### go to ui directory, npm start // Disclosure: possible cors issue
#### common commands api: 
#####   npm i forever --save
#####   alias forever='./node_modules/forever/bin/forever'
#### common commands ui:
#####   npm install pm2 serve -g
#####  npm run build
#####   pm2 serve build YOUR_PORT --spa    // 1024 < PORT < 65535
#####   (pm2 delete id#, npm run build, pm2 serve build port# --spa to update) 
