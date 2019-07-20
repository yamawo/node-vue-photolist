build:
	cd client && npm run build && mv dist/* ../server/static/
run: 
    node app.js