# Black Thumb README

## http://black-thumb.surge.sh/
Find Black Thumb deployed and working on Surge!

This site lists plants stored in a Ruby on Rails database and allows the user to assign specific plants to themselves.

#### Post MVP
The ultimate goal of this app is to guide users in caring for ill or dying house plants.

### User Stories
As a plant killer I want to save plants so that I can not kill plants

## Deployed setup
Black Thumb back-end is on [Heroku] (https://black-thumb.herokuapp.com)
Black Thumb front-end is on [Surge] (http://black-thumb.surge.sh/)

## Deployed view
![Imgur](https://i.imgur.com/YTz3hUR.png)

## Installation Setup

### Getting started
1. Install node, ruby, and rails
1. `git clone https://github.com/TeiganH/black-thumb.git`
1. `cd black-thumb`
1. `rails db:create`
1. `rails db:migrate`
1. `rails db:seed`

### Run servers
1. `rails s`
1. Open new terminal tab and start back-end server on localhost 3000
1. `cd client`
1. Start the front-end server on localhost 3001 (a browser)
1. `npm i`
1. `npm start`

## Wireframes
![Imgur](https://i.imgur.com/BPyNTpE.jpg)
![Imgur](https://i.imgur.com/U3PcI6O.jpg)
![Imgur](https://i.imgur.com/9sFeaVm.jpg)
![Imgur](https://i.imgur.com/UrKDwha.jpg)

## ERD
![Imgur](https://i.imgur.com/Kj34L31.jpg)

## Citations
1. To solve the issue of allowing the user to update their email or password I used a LinkButton component. Source: https://stackoverflow.com/a/49439893
1. Plant images from https://www.thesill.com/
1. Plant info from https://wikipedia.com




