build:
	cd client && npm run build && mv dist/* ../server/static/
run: 
	cd server && node app.js