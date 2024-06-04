# Scrapes data for Letterboxd's 936 most popular films and stores in movies.json
# Working as of 6/3/2024

from bs4 import BeautifulSoup
from selenium import webdriver;
import pandas as pd
import time
import json

def scrape_popular(page, data):
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
    time.sleep(5)
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
        scrape_popular(curr_page, data)
        curr_page += 1

    # Converting data to string in json format using pandas, writes to file
    df = pd.DataFrame(data)
    json_str = df.to_json(orient='records')
    parsed = json.loads(json_str)
    with open('movies.json', 'w') as file:
        file.write(json.dumps({"data": parsed}, indent=4))

    print("Process finished")