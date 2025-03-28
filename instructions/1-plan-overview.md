
Tech Stack:
Backend: NestJS, PostgreSQL
Frontend: Next.js, React.js, TypeScript
Testing:
Set up test cases using Playwright
Deployment:
Host the application on any cloud platform
Submission Requirements
GitHub repository link containing your code


You are required to build a simplified music application similar to Spotify with the following functionalities:
Core Features:
Display a list of songs
- Spotify lists songs in a category, like in trending we can show latest 10 songs, artists with a circular form with artists name on it, popular album and single.
 1. Albums in spotify has squarish UI component 
  * Has a details view with list view of songs
  * Has show all button which bluntly reuse the Circular UI component
  * Cannot like the albums
 2. Artists have circular UI component
  * Has a details view with list view of songs
  * Has show all button which bluntly reuse the Circular UI component
  * Cannot like the albums
 3. Songs has a list UI component. 
  * User can like songs
  * User can view the liked songs in the left Navbar

Note:
Our app has Four sections, 
* Top Navbar (Which has Logo, Home, Search component and Profile image) - Should never re-render after initial render.
* Side navbar (Mainly for liked songs, has a simple client side search) - Should only re-render when new song is liked so that new song will get listed once it is liked by user.
* Bottom player (Which has song image/Album image, Song title and artist, like button, Player features: Play, prev song, next song, shuffle and repeat, volume slider) - Should re-render only when a song is changed or selected
* Main section is where we display All Albums, Artists etc, searches re-renders this page - Clicking on home button re-renders this page, searching results will display here so it should be re-render on every keystroke on search.

Routes:
GET / -> Home route
GET /search (Should use main section to render the search results)
GET /album/:album_ID (Should use main section to render the search results)
GET /artist/:artist_ID 
POST /like/:song_id 

Implementing song search functionality:
- Let's implement debouncing as it would be efficient in making API calls
- Ans: There are two states, Home -> Search results



Folder structure:
front-end -> Should have Nextjs repository
back-end -> Should have NestJS repository

