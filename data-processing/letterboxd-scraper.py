# Scrapes data for Letterboxd's 936 most popular films and stores in movies.csv
# Working as of 5/28/2024

from bs4 import BeautifulSoup
from selenium import webdriver;
import pandas as pd
import time
import random

def scrape_page(page, data):
    '''
    Scrapes Letterboxd most popular films data for given page.
    Parameters:
        page - int representing page to scrape
        data - list of data that function appends to
    '''

    if page == 1:
        url = "https://letterboxd.com/films/popular/"
    else:
        url = f"https://letterboxd.com/films/popular/page/{page}/"
    browser = webdriver.Firefox()
    browser.get(url)
    html = browser.page_source
    soup = BeautifulSoup(html, features="html.parser")

    if soup.title.text != "Letterboxd - Not Found":
        print(f"Currently scraping page #{page}")
        films = soup.find_all("li", class_="listitem poster-container")    
        
        for film in films:
            item = {}
            item['Title'] = film.find('div').attrs['data-film-name']
            item['Year'] = film.find('div').attrs['data-film-release-year']
            item['Rating'] = film.attrs['data-average-rating']
            item['Image Source'] = film.find('img').attrs['src']

            # Changing Image Source to get larger version of image
            start_idx = item['Image Source'].index('0-70-0-105')
            end_idx = start_idx + 10
            item['Image Source'] = item['Image Source'][:start_idx]+'0-1000-0-1500'+item['Image Source'][end_idx:]

            data.append(item)     
    else:
        print(f"Couldn't scrape page #{page}")

    browser.close()



if __name__ == '__main__':
    curr_page = 1
    data = []

    # Scrapes first 13 pages from Letterboxd's most popular films
    while curr_page < 14:
        scrape_page(curr_page, data)
        curr_page += 1

        # Wait a little bit to scrape next page
        if curr_page < 14:
            time.sleep(random.randint(10, 20))

    df = pd.DataFrame(data)
    df.to_csv("movies.csv")