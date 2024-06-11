# Letterboxd Higher or Lower Game

Simple web application that allows users to compare Letterboxd movie ratings and guess which movie has a higher rating. Inspired by the popular "Higher or Lower" game format, this project uses data scraped from Letterboxd. Check out deployed website here: https://letterboxdhol.netlify.app/

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Scraping Your Own Data](#scraping-your-own-data)

## Features

- Compare the ratings of two randomly selected movies from Letterboxd.
- Track your score as you guess which movie has a higher rating.
- Play with data scraped from 936 of the most popular films on Letterboxd.
- Responsive design for an optimal experience on both desktop and mobile devices.

## Technologies Used

### Front End
- **React**
- **Vite**
- **CSS**

### Back End
- **JavaScript**
- **Node.js**
- **Express.js**
- **MongoDB**

### Data Scraping
- **Python**
- **Selenium**
- **BeautifulSoup4**

## Installation

To run the front end locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/jjoej15/letterboxd-HoL.git
   cd letterboxd-HoL
   ```

2. **Install dependencies and start development server:**
   ```sh
   cd front-end
   npm install
   npm run dev
   ```

3. **Open on local server**

## Scraping Your Own Data

If you want to scrape your own data from Letterboxd, follow these steps:

1. **Navigate to data-processing directory**

2. **Install the required Python packages:**
   ```sh
   pip install beautifulsoup4 selenium pandas
   ```

3. **Run the script:**
   ```sh
   python letterboxd_scraper.py
   ```

By following these steps, you can customize the data set used in your Letterboxd Higher or Lower game with the latest data by loading your movies.json file into your own MongoDB database, connecting your database to back end and changing fetch address in Game.jsx.
