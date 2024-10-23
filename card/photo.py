import requests
from bs4 import BeautifulSoup
import os

# List of clubs
clubs = [
    "INTER MILAN", "FC BAYERN MUNICH", "LIVERPOOL FC", "CHELSEA FC", "NEW CASTLE UNITED FC",
    "MANCHESTER CITY FC", "FC BARCELONA", "WOLVES", "MOHUN BAGAN AC", "REAL MADRID CF",
    "SEPAHAN SC", "AL-NASSR FC", "BORUSSIA DORTMUND", "ARSENAL FC", "LOSC LILLE",
    "PARIS SAINT-GERMAIN FC", "MANCHESTER UNITED FC", "RB LEIPZIG", "AC MILAN",
    "TOTTENHAM HOTSPUR FC", "RANDERS FC", "VFL WOLFSBURG", "ATLETICO DE MADRID", 
    "RED BULL BRAGANTINO", "AL HILAL SFC", "SS LAZIO", "SPORTING CP", "RC LENS", 
    "BAYER LEVERKUSEN", "AFC AJAX", "FC PORTO", "ASTON VILLA FC"
]

# Folder to save the logos
if not os.path.exists('club_logos'):
    os.makedirs('club_logos')

# Function to download the logo
def download_logo(club_name):
    search_url = f"https://www.google.com/search?q={club_name}+logo+PNG"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the first image result
    image = soup.find('img')
    
    if image:
        img_url = image['src']
        img_data = requests.get(img_url).content
        with open(f'club_logos/{club_name}.png', 'wb') as f:
            f.write(img_data)
        print(f"Downloaded: {club_name}.png")
    else:
        print(f"Logo not found for {club_name}")

# Download logos for each club
for club in clubs:
    download_logo(club)