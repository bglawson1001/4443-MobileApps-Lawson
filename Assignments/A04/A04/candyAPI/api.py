# Libraries for FastAPI
from fastapi import FastAPI, Query, Path
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from pymongo import MongoClient
from typing import List
from mongoManager import MongoManager
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from pymongo.errors import ConnectionFailure  # Import ConnectionFailure
from pydantic import BaseModel  # Add this import
import hashlib
# Builtin libraries
import os
from random import shuffle
"""
           _____ _____   _____ _   _ ______ ____
     /\   |  __ \_   _| |_   _| \ | |  ____/ __ \
    /  \  | |__) || |     | | |  \| | |__ | |  | |
   / /\ \ |  ___/ | |     | | | . ` |  __|| |  | |
  / ____ \| |    _| |_   _| |_| |\  | |   | |__| |
 /_/    \_\_|   |_____| |_____|_| \_|_|    \____/
The `description` is the information that gets displayed when the api is accessed from a browser and loads the base route.
Also the instance of `app` below description has info that gets displayed as well when the base route is accessed.
"""
description = """:clown_face:
(This description is totally satirical and does not represent the views of any real person alive or deceased.
And even though the topic is totally macabre, I would love to make anyone who abuses children very much deceased.
However, the shock factor of my stupid candy store keeps you listening to my lectures. If anyone is truly offended
please publicly or privately message me and I will take it down immediately.):clown_face:
## Description:
Sweet Nostalgia Candies brings you a delightful journey through time with its extensive collection of
candies. From the vibrant, trendy flavors of today to the cherished, classic treats of yesteryear,
our store is a haven for candy lovers of all ages (but mostly kids). Step into a world where every shelf and corner
is adorned with jars and boxes filled with colors and tastes that evoke memories and create new ones.
Whether you're seeking a rare, retro candy from your childhood or the latest sugary creation, Sweet
Nostalgia Candies is your destination. Indulge in our handpicked selection and experience a sweet
escape into the world of confectionery wonders! And don't worry! We will watch your kids!! (:wink:)
#### Contact Information:
- **Address:** 101 Candy Lane, Alcatraz Federal Penitentiary, San Francisco, CA 94123.
- **Phone:** (123) 968-7378 [or (123 you-perv)]
- **Email:** perv@kidsinvans.com
- **Website:** www.kidsinvans.fun
"""
# Needed for CORS
# origins = ["*"]
# This is the `app` instance which passes in a series of keyword arguments
# configuring this instance of the api. The URL's are obviously fake.
app = FastAPI(
    title="KidsInVans.Fun:clown_face:",
    description=description,
    version="0.0.1",
    terms_of_service="http://www.kidsinvans.fun/worldleterms/",
    contact={
        "name": "KidsInVans.Fun",
        "url": "http://www.kidsinvans.fun/worldle/contact/",
        "email": "perv@www.kidsinvans.fun",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)
# Needed for CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
"""
  _      ____   _____          _         _____ _                _____ _____ ______  _____
 | |    / __ \ / ____|   /\   | |       / ____| |        /\    / ____/ ____|  ____|/ ____|
 | |   | |  | | |       /  \  | |      | |    | |       /  \  | (___| (___ | |__  | (___
 | |   | |  | | |      / /\ \ | |      | |    | |      / /\ \  \___ \\___ \|  __|  \___ \
 | |___| |__| | |____ / ____ \| |____  | |____| |____ / ____ \ ____) |___) | |____ ____) |
 |______\____/ \_____/_/    \_\______|  \_____|______/_/    \_\_____/_____/|______|_____/
This is where you will add code to load all the countries and not just countries. Below is a single
instance of the class `CountryReader` that loads countries. There are 6 other continents to load or
maybe you create your own country file, which would be great. But try to implement a class that
organizes your ability to access a countries polygon data.
"""
mm = MongoManager(db="candy_store")
"""
  _      ____   _____          _        __  __ ______ _______ _    _  ____  _____   _____
 | |    / __ \ / ____|   /\   | |      |  \/  |  ____|__   __| |  | |/ __ \|  __ \ / ____|
 | |   | |  | | |       /  \  | |      | \  / | |__     | |  | |__| | |  | | |  | | (___
 | |   | |  | | |      / /\ \ | |      | |\/| |  __|    | |  |  __  | |  | | |  | |\___ \
 | |___| |__| | |____ / ____ \| |____  | |  | | |____   | |  | |  | | |__| | |__| |____) |
 |______\____/ \_____/_/    \_\______| |_|  |_|______|  |_|  |_|  |_|\____/|_____/|_____/
This is where methods you write to help with any routes written below should go. Unless you have
a module written that you include with statements above.
"""
"""
  _____   ____  _    _ _______ ______  _____
 |  __ \ / __ \| |  | |__   __|  ____|/ ____|
 | |__) | |  | | |  | |  | |  | |__  | (___
 |  _  /| |  | | |  | |  | |  |  __|  \___ \
 | | \ \| |__| | |__| |  | |  | |____ ____) |
 |_|  \_\\____/ \____/   |_|  |______|_____/
 This is where your routes will be defined. Routes are just python functions that retrieve, save,
 delete, and update data. How you make that happen is up to you.
"""
#define client and db so that we can use these in the routes
client = MongoClient("mongodb://localhost:27017")
db = client["candy_store"]
collection = db["candies"]
users_collection = db["users"]
# MongoDB model for User
class User(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    password: str
# MongoDB model for Login
class Login(BaseModel):
    username: str
    password: str
# Hash password using SHA-256
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()
# User registration endpoint
@app.post("/register", tags=["User"])
async def register_user(user: User):
    # Check if username or email already exists
    if users_collection.find_one({"$or": [{"username": user.username}, {"email": user.email}]}):
        raise HTTPException(status_code=400, detail="Username or email already exists")
    # Hash password before storing
    user.password = hash_password(user.password)
    # Insert user into MongoDB
    users_collection.insert_one(user.dict())
    return {"success": True, "message": "User registered successfully"}
# User login endpoint
@app.post("/login", tags=["User"])
async def login_user(login: Login):
    # Hash password for comparison
    login.password = hash_password(login.password)
    # Find user by username and hashed password
    user = users_collection.find_one({"username": login.username, "password": login.password})
    if user:
        return {"success": True, "message": "User logged in successfully"}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")
@app.get("/listusers")
def listAllUser():
    """
    Retrieve a list of all candies available in the store.
    """
    mm.setCollection("users")
    result = mm.get(filter={"_id": 0})
    return result
@app.get("/")
async def docs_redirect():
    """Api's base route that displays the information created above in the ApiInfo section."""
    return RedirectResponse(url="/docs")
@app.get("/candies")
def list_all_candies():
    """
    Retrieve a list of all candies available in the store.
    """
    mm.setCollection("candies")
    result = mm.get(filter={"_id": 0})
    return result
@app.get("/candies/category/{category}")
def candies_by_category(category: str):
    """
    Search for candies based on a query string (e.g., name, category, flavor).
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"category": category},
        filter={"_id": 0, "name": 1, "price": 1, "category": 1},
    )
    return result
@app.get("/candies/id/{id}")
def get_candy_by_id(id: str):
    """
    Get detailed information about a specific candy.
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"id": id}, filter={"_id": 0, "name": 1, "price": 1, "category": 1}
    )
    return result
@app.post("/candies")
def add_new_candy(new_candy: dict):
    """
    Add a new candy to the store's inventory.
    """
    try:
        # Set the collection to "candies"
        mm.setCollection("candies")
        # Insert the new candy data into the collection
        mm.post(document=new_candy)
        # Return a success message
        return {"success": True, "message": "Candy added successfully"}
    except Exception as e:
        # Return an error message if an exception occurs
        raise HTTPException(status_code=500, detail=str(e))
@app.put("/candies/{candy_id}")
def update_candy_info(candy_id: int):
    """
    Update information about an existing candy.
    """
    pass
@app.delete("/candies/{candy_id}")
def delete_candy(candy_id: str):
    """
    Remove a candy from the store's inventory.
    """
    try:
        # Set the collection to "candies"
        mm.setCollection("candies")
        # Insert the new candy data into the collection
        mm.delete(document=candy_id)
        # Return a success message
        return {"success": True, "message": "Candy added successfully"}
    except Exception as e:
        # Return an error message if an exception occurs
        raise HTTPException(status_code=500, detail=str(e))
@app.get("/categories")
def list_categories():
    """
    Get a list of candy categories (e.g., chocolates, gummies, hard candies).
    """
    categories = collection.distinct("category")
    return {"categories": categories}
@app.get("/candies")
def get_candies_by_keyword(keyword: str = Query(..., title="Keyword in Name")):
    """
    Retrieve candies containing the specified keyword in their name.
    """
    mm.setCollection("candies")
    result = mm.get(query={"name": {"$regex": keyword, "$options": "i"}})
    if result.get("success"):
        return JSONResponse(content=result["data"])
    else:
        return JSONResponse(
            content={"message": "Error occurred while fetching candies."},
            status_code=500,
        )
"""
This main block gets run when you invoke this file. How do you invoke this file?
        python api.py
After it is running, copy paste this into a browser: http://165.227.222.91:8084/docs
You should see your api's base route!
Note:
    Notice the first param below: api:app
    The left side (api) is the name of this file (api.py without the extension)
    The right side (app) is the bearingiable name of the FastApi instance declared at the top of the file.
"""
if __name__ == "__main__":
    uvicorn.run(
        "api:app", host="165.227.222.91", port=8084, log_level="debug", reload=True
    )
"""                                   ^
                                      |
CHANGE DOMAIN NAME                    |
"""
