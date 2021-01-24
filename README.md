# Tiimintulokset
> Statistics for CS:GO FACEIT games.

Fullstack web-app to track friends' stats from games. Uses data from the [FACEIT API](https://developers.faceit.com/docs/tools/data-api).
Built with Nodejs using Express for backend, frontend with React and database from [MongoDb Atlas](https://www.mongodb.com/cloud/atlas).


## How to install and run locally

> Docker support coming to ease this process

Fork or clone the repo and run npm install on both back- and frontend.

Windows:

```sh
git clone https://github.com/Heseduud/tiimintulokset.git
cd backend
npm install
cd ../frontend
npm install
```

To run the backend succesfully, you'll need an FACEIT API token and a MongoDB atlas database.

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
To run the backend locally in development mode. Frontend should run with just npm start without any configuration.


## Release History

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
