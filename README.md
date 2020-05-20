# "Just One" - SoPraFS20 - Group 7
![Deploy Project](https://github.com/SoPra-Group-07/client/workflows/Deploy%20Project/badge.svg)
<img src="https://img.shields.io/github/v/tag/SoPra-Group-07/client" alt="Tag">


## Introduction
This is an implementation of the Just One game. It is a cooperative party game in which the goal is to discover as many mystery words as possible. 
While one player has the chance to guess the mystery word, which is determined by a card drawn by that player,
the other players have to find the best clue in order to help the player guessing the word. 
So, contrary to most games you know, in this game you have to work together to win the game. 
A game is played over thirteen cards and the score is additionally determined by factors like answer time and more.

## Technologies
- React framework
- JavaScript
- Node Package Manager (npm)
- CSS
- GitHub
- Heroku
- SonarQube

## High-level components
...

## Launch & Deployment
### Getting started with React

Read and go through those Tutorials, It will make your life easier!

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](http://localhost:3000) and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Once you have done all of this, in the template there are two main external dependencies that you should look at:

- [styled-components](https://www.styled-components.com/docs)
  It removes the mapping between components and styles (i.e. external css files). This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it
* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) Declarative routing for React being a collection of navigational components that compose declaratively with your application. 

<!-- ## IDE Recommendation
As a student, you have the possibility with [JetBrains](https://www.jetbrains.com/student/) to obtain a free individual license and have access to several IDEs. 
We recommend you to use [WebStorm](https://www.jetbrains.com/webstorm/specials/webstorm/webstorm.html?gclid=EAIaIQobChMIyPOj5f723wIVqRXTCh3SKwtYEAAYASAAEgLtMvD_BwE&gclsrc=aw.ds) for your front-end. 
Once you have downloaded and installed it, you can add the following WebStorm plugins: 
> Go to Preferences > Plugins > Browse Repositories and look for: 
* [styled-components](https://plugins.jetbrains.com/plugin/9997-styled-components) (provides coding assistance like CSS Highlighting for Styled Components)
* [prettier](https://plugins.jetbrains.com/plugin/10456-prettier) (a smart code formatter)
* [Material Theme UI](https://plugins.jetbrains.com/plugin/8006-material-theme-ui) (Material Theme for Jetbrains IDEs, allowing a total customization of the IDE including Themes, Color Schemes, Icons and many other features.)

Feel free to use other IDEs (e.g. [VisualStudio](https://code.visualstudio.com/)) if you want.  -->

### Prerequisites and Installation

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn More

To learn React, check out the [React documentation](https://reactjs.org/).


>Thanks to Lucas Pelloni for the template


## Illustrations
The following screenshots will show the main user flow of the game's interface. <br>
### Register/Login 
The first step of the interface involves the registration and login process. Here a new user has to enter any desired user name (which is not already taken) and a password. After successfully registering the user can login by entering the same information on the login screen correctly.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/register.JPG" alt="register" width="700"/>
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/login.JPG" alt="login" width="700"/><br>
### Game Creation
After a successful login the user sees the overview page and has the option to create a new game. By clicking on the "Create new game"-button, the user can choose the new game's name, wether a bot should be included and wether the new game should be a demo game.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/overview.JPG" alt="overview" width="700"/>
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/newGame.JPG" alt="New Game" width="700"/>
<br><br>
All other users who desire to join a game can do this by clicking on the "Join Game"-button. They will see a list of all open games (including the number of players in each game) and can join one by simply clicking on the name of the desired game.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/joinGame.JPG" alt="Joining Game" width="700"/>
<br><br>
Once in the game only the user who had created the game (admin user) can start the game (if the required 3-7 users are in the game). As long as the game hasn't begun yet, any user besided the admin user can still leave the game.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/gameLobby.JPG" alt="Game Lobby" width="700"/>
<br><br>
### Game Run
When a game starts, one player will be selected to be the guessing player for the first round and has to choose a number between 1 and 5, which selects the word to be guessed from that specific card (determined randomly). While the guessing player is choosing the number the other players will see a waiting screen.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/chooseNumber.JPG" alt="Choose a number" width="700"/>
<br><br>
Once the word has been determined by the guessing player, the other players are able to submit their clues. For this task they got 1 minute (which is displayed to them on the screen). If they don't submit any clue within this time, no clue will be submitted (which leads to less points). Throughout the clueing phase the guessing player is able to see which player has already submitted a clue in real time.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/clue.JPG" alt="Submit a clue" width="700"/>
<br><br>
As all players have submitted their clues or 1 minute has elapsed, the guessing player will be able to sumbitt a guess. All clues are displayed on the screen, unless the clue was a duplicate or not valid due to similarity to the word to be guessed. The player also has 1 minute time to submit and if this time elapses no guess is submitted. Additionally the player can also submit no guess by clicking the respective button.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/guess.JPG" alt="Submit a guess" width="700"/>
<br><br>
After the submission of a guess the current game round will come to an end and each player gets to see the information about the round. This includes, among other information wether, the guess was right and the achieved points.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/roundSummary.JPG" alt="Round Summary" width="700"/>
<br><br>
If a player is interested how his points were calculated, there is the option to see this information by clicking on the blue button, which activites an overlay screen.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/points.JPG" alt="Point Calculation" width="700"/>
<br><br>
### End of a Game
A game includes 13 rounds in total in the beginning, but after each wrong guess the game looses one round. So when a game reaches its last round, a statistics page will be displayed in the end and the game is completed. On this page the players will be able to see their total points and the points of all the other players.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/statistics.JPG" alt="Statistics" width="700"/>
<br><br>
On the overview page users can click on the "Leaderboard"-button to see the leaderboard. The ranks and points of all players who ever played and finished a game are visible.
<br><br>
<img src="https://github.com/SoPra-Group-07/client/blob/master/screenshots/leaderboard.JPG" alt="Leaderboard" width="700"/>

## Roadmap
If you have ideas to improve our application, feel invited to join us. 
We suggest following additional features for our application:
- It would be nice to have a multimodal UI where players can for example play "just-one" in a pantomime way or
    in giving clues by drawings.
- It would be nice to make the UI customizable in terms of themes that can be selected
- It would be great if users could create a bitmoji that looks just like them, this could then be pulled into the game
- It would be great if users had a way to communicate with each other, maybe a chat function?

## Authors and acknowledgement
- Jason Browne

- Dario Gagulic

- Dave Basler

- Lynn Zumtaugwald

- Piero Neri

Many thanks to the whole SOPRA FS20 Team for supporting us througout the project. 
A special thank goes to our TA, Jenny Schmid. 

## License
<img src="https://img.shields.io/github/license/SoPra-Group-07/client" alt="License"><br>
See the [LICENSE](LICENSE) file for license rights and limitations (Apache License 2.0). 

