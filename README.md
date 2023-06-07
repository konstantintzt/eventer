# Eventer
Eventer is a platform designed to help you discover, organize, and share events happening in the Los Angeles area. With a user-friendly interface and a variety of features, Eventer makes it easy for you to stay connected with the local events that interest you the most.

![](/client/public/android-chrome-512x512.png)

Image source and credit goes to [Dall-E 2.](https://labs.openai.com/)

## Features

- [x] **Google Authentication and Login**: Quickly and securely sign in to Eventer using your Google account.
- [x] **Add Your Own Events**: Hosting an event? Share it with the community by creating a post on Eventer.
- [x] **Bulletin Board**: Browse through a collection of events happening in the LA area, all in one place.
- [x] **Event Pages**: On each event page, you can (a) like the event and (b) indicate that you're planning to attend. You can also see which other attendees are planning to join.
- [x] **Recommendation Engine**: Eventer uses your attending history to recommend events that align with your interests, ensuring you never miss out on the events you love most!

## Usage

To get started with Eventer, simply clone the repository and run the server on your local machine.
1. Clone the repository: `git clone https://github.com/yourusername/eventer.git`

### **Important Installation Note:**
**Before running any of the following commands, please enter the `/server` directory and creating a brand new `.env` file with the following format:**

```.env
PORT=2902
ENGINE_PORT=2903   
MONGO_URI="mongodb+srv://YOUR_MONGODB_URI"
DB_NAME = "YOUR_MONGODB_DATABASE_NAME"
```

Feel free to change PORT and ENGINE_PORT at your convenience, though please ensure that they're never on the same port. Also, please ensure that your MongoDB URI is valid and that you have a database with the correct name in your MongoDB cluster.

### Starting the server-side backend:
> 1.1. Navigate to the server directory: `cd server`

> 1.2. Install the JS server dependencies: `npm install`

> 1.3. Install the Python machine learning engine dependencies: `pip install -r requirements.txt`

> 1.4. Start the server: `npm start`

### Starting the client-side frontend:
> 2.1. Navigate to the client directory: `cd client`

> 2.2. Install the client dependencies: `npm install`

> 2.3. Start the client: `npm start`

Now you're ready to explore and enjoy all the features Eventer has to offer!

## Licensing
Eventer is released under the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html). For more information, please refer to the [LICENSE](/LICENSE) file in the repository.

## Contributing
We're welcoming contributions from the community! If you’d like to contribute to Eventer, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them to your branch.
4. Submit a pull request with a description of your changes.

We'll review your pull request in a timely fashion. Thank you!