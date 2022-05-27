The website for the final project deepens and expands the notions learned during the course, using the training of the mind and body as a pretext to propose 4 different challenges. Each challenge provides a personal score that is updated as each challenge is completed, plus a global database is updated to account for the challenge score of all users.

> Distinctiveness and Complexity:

The site is divided into 4 main apps, connected to each other, which use databases and use JavaScript to modify the DOM and make fetch requests, several models and some forms related to them have been created

———
> How to run the application: 

1. The project is available at https://github.com/me50/Athryell/tree/web50/projects/2020/x/capstone
2. Download the project and in your terminal, cd into the final_project directory.
3. Run pip install -r requirements.txt
4. Run python manage.py makemigrations to make migrations for the app.
5. Run python manage.py migrate to apply migrations to your database.
6. Run python manage.py loaddata exercises.json to pre-populate the database with some exercises.
7. Run python manage.py runserver to start the server.
8. Open the page in localhost:8000 <- “localhost” is IMPORTANT.
——


> What’s contained in each file you created:

All pages use:
- HTML
- Custom CSS (using SASS) to make the page responsive and for some animations (Bootstrap was initially inserted but in the end it is mainly used to stylize the buttons and little else).
- JavaScript to communicate with databases, requesting information, adding or modifying parameters (fetch) and modifying the DOM dynamically.
- Python for the backend

The file is divided into 4 main applications:
"brain_and_body": which manages the main pages (home, profile, global stats)
"brain": which manages and groups the 2 activities related to the mind
"body": which manages and groups the 2 activities related to the body
"users": which manages and groups the activities related to users (register, login, etc.)

Detail:
- Home page: uses CSS animations and transitions to make it more interactive

- Register page: During registration it is also necessary to enter a location of origin and at the same time a database is created to keep track of the score of each characteristic.

- Workout page: The Workout page uses a database of exercises, divided by category, allowing you to choose the amount of exercises you want to perform and the category, they will then be chosen from a pool, according to the specified parameters, preparing a suggestion of training.
If the workout is accepted, a timer starts that can be stopped when desired (ideally when the workout is finished) at the end of which points are provided based on the duration.

(Some exercises are provided by default to every user who registers for the first time, see "Profile" below for more details)

- Tabata page: The Tabata page (Tabata is a type of interval training), allows you to insert and remove "disposable" exercises divided by a comma, which are separated and shown in an ordered and dynamic way via JS.
Providing a confirmation, an animation begins to choose the exercises randomly in order to create a workout.
If accepted, the training begins by starting a countdown, alternating periods of "activity with" rest "periods, and selecting the current exercise.
If completed, the training provides points.

- Memory page: The Memory page implements a simple memory game, created with CSS and JS, which takes into account the turns played for scoring. Images are loaded and displayed using Pillow

- Reactivity page: The Reactivity page (also sometimes called Speed), features a minigame in which you have to click with the pointer inside circles that appear randomly in an area of ​​the screen, before they disappear. As the player's skill increases, the circles disappear faster.
This page explores the use of the HTML Canvas using JS to draw and manipulate shapes inside.


-- The user profile and the "Global Stats" page use the JS d3 library for creating graphs:
- Profile page: From the user profile it is possible to log out (the navigation link 'profile' becomes 'logout' when this page is open).
A pie chart is shown that represents the proportions of the points of the various activities, the quantity is instead shown in the legend alongside.
At the bottom of the page you can see the exercises available divided by category, some exercises are provided by default to all users the first time they register but the user can delete them or add new ones thanks to the form on the side.

- Global stats: The Global Stats page collects the data of all registered users and represents them in pie charts divided by continent


> Any other additional information the staff should know about your project:

- The layout of the pages may change depending on the size of the window, some elements are removed while others change position.
If we modify the pages with the 'profile' and 'globalStats' graphics and the "reactivity" page while they are open it is advisable to reload them to see the changes take place (it is assumed that the user opens the page from a device with a fixed size and not that he changes the page during activities).

- To speed up the debugging and testing of the "Tabata" page I kept the countdowns and the amount of exercises under 5 seconds or 5 units and I thought it might be useful to leave them like this for the moment.
Before releasing the web page the variables "tabataCounts", "activeTimer" and "restTimer" present in static/body/tabata.js needs to be reset to the original ones (details are in the file's comments)

(Challenges and workouts are created for demonstration and entertainment purposes only, they do not reflect truly applicable activities)
