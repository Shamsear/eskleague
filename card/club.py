import requests
from bs4 import BeautifulSoup
import os

# List of clubs
clubs = [
    "Inter Milan", "FC Bayern Munich", "Liverpool FC", "Chelsea FC", 
    "Newcastle United FC", "Manchester City FC", "FC Barcelona", 
    "Wolves", "Mohun Bagan AC", "Real Madrid CF", "Sepahan SC", 
    "Al-Nassr FC", "Borussia Dortmund", "Arsenal FC", "LOSC Lille", 
    "Paris Saint-Germain FC", "Manchester United FC", "RB Leipzig", 
    "AC Milan", "Tottenham Hotspur FC", "Randers FC", "VfL Wolfsburg", 
    "Atletico de Madrid", "Red Bull Bragantino", "Al Hilal SFC", 
    "SS Lazio", "Sporting CP", "RC Lens", "Bayer Leverkusen", 
    "AFC Ajax", "FC Porto", "Aston Villa FC","Atlanta BC", "Inter Miami","SL Benfica", "Rangers FC", "FSV Mainz 05"
]

# Create a directory to save logos
os.makedirs("club_logos", exist_ok=True)

# Function to download logos
def download_logo(club_name):
    search_url = f"https://en.wikipedia.org/wiki/{club_name.replace(' ', '_')}"
    response = requests.get(search_url)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        logo = soup.find('table', class_='infobox').find('img')
        
        if logo:
            logo_url = "https:" + logo['src']
            logo_response = requests.get(logo_url)

            # Save the logo as PNG
            if logo_response.status_code == 200:
                with open(f"club_logos/{club_name}.webp", 'wb') as f:
                    f.write(logo_response.content)
                print(f"Downloaded logo for {club_name}")
            else:
                print(f"Failed to download logo for {club_name}")
        else:
            print(f"No logo found for {club_name}")
    else:
        print(f"Failed to retrieve page for {club_name}")

# Download logos for each club
for club in clubs:
    download_logo(club)
