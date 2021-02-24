# Tiimintulokset
> Statistics for CS:GO FACEIT games.

Fullstack web-app to track friends' stats from games. Uses data from the [FACEIT API](https://developers.faceit.com/docs/tools/data-api).
Built with Nodejs using Express for backend, frontend with React and database from [MongoDb Atlas](https://www.mongodb.com/cloud/atlas).


## How to install and run locally

### Production build (run as-is):

Be sure you have installed [Docker](https://www.docker.com/get-started) AND [Docker-compose](https://docs.docker.com/compose/install/) locally.
Fork or clone the repo.

To run the backend succesfully, you'll need an FACEIT API token and a MongoDB atlas database.
Create an .env file in the backend root directory (tiimintulokset/backend/.env) with the following content:
```sh
MONGODB_URI=<YOUR MONGODB URI HERE>
FACEIT_API_KEY=Bearer <YOUR FACEIT API TOKEN HERE>
PORT=<3001>
```

After this, just run the following in the root directory (grab a cup of coffee or tea while you're at it, might take a while on the first build):
```
docker-compose up
```

The app will be accessible in your browser of choice at localhost:3000.

### Developer:

Fork or clone the repo and run npm install on both back- and frontend.

Windows:

```sh
git clone https://github.com/Heseduud/tiimintulokset.git
cd backend
npm install
cd ../frontend
npm install
```

Create an .env file in the backend root directory with the following content:
```sh
MONGODB_URI=<YOUR MONGODB URI HERE>
FACEIT_API_KEY=Bearer <YOUR FACEIT API TOKEN HERE>
PORT=<Port you want to serve the backend from, using 3001 currently>
```
After this, 
```sh
npm start
```
To run the backend locally in development mode. Frontend will run with just npm start without any configuration.


## Release History

* 0.0.2
	* Working prototype with Docker support. Most of the main features work as intended.
* 0.0.1
    * Initial commit to github, a rough skeleton for the project.

## Contact

Santeri Nurminen – nusanteri@gmail.com - 
[https://github.com/Heseduud/](https://github.com/Heseduud/)


## Contributing

1. Fork it (<https://github.com/Heseduud/tiimintulokset/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
