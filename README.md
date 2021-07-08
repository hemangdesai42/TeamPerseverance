![Console-Game Main Page](https://drive.google.com/uc?export=view&id=1r4BbZ5XycH48EGtZvEeMLoqTZuD-5nFh)

# Console-Game
Console-Game is a clone of Goodreads with a focus on video games.  Users have a gameshelf that they can add games to.

## Features
 - Users can browse games on the main page and view games in their game shelves.
 - Users can add games to their game shelf and move them between categories/remove them.
 - Users can rate games and can edit their ratings.
 - Users can leave reviews and edit/delete their reviews.

## Technology

 - Javascript
 - Pug
 - Express.JS
 - Sequelize
 - PostgreSQL
 - CSS

## Installation

1. Clone the repo and install dependencies

```
git clone https://github.com/hemangdesai42/TeamPerseverance.git
npm install
```

2. Create a .env file based on the example.
3. Setup database user, password and database.
4. Migrate/Seed database
```
npx sequelize db:migrate
npx sequelize db:seed:all
```


## Features
# Game Shelf
Users can view games in their game shelf.  Users can add/remove/edit games in their game shelf.

![Gameshelf](https://drive.google.com/uc?export=view&id=19z_l_VTGZOUZDMXbh24lhuZEHDx-PRDc)
![Gameshelf-add](https://drive.google.com/uc?export=view&id=1z1TxCXZAJS4FD4x4icd1pJyQtUtIUGD4)

# Game Page
Users can view a game page, which contains information about the game.  Users can also add games to their shelf, rate and review games on this page.

![Game](https://drive.google.com/uc?export=view&id=1sq6aw50IjqQdBY57R_od7T06LRM_0snA)

# Ratings
Users can rate games, change their ratings and delete their rating.

![Ratings](https://drive.google.com/uc?export=view&id=1KhqrNgKBcAr5GO1ftBw92S_KG_Owqrkg)

# Reviews
Users can review a game, view the reviews and edit/delete their reviews.

![Review](https://drive.google.com/uc?export=view&id=181K11GM1yjhSRBXtMrC8dKDx9LTFUmRu)
![ReviewEdit](https://drive.google.com/uc?export=view&id=1XlG7LDIeJyBh3CNYStJA4SpFWayGujuT)
