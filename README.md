Everything important is in the MapView.jsx file

the ClickHandler function records the lat and log values when a sure clicks
the MarkerList function takes in a markerList array and outputs the whole list when the user clicks the button to trigger it

MapView is renders the map using built in functions
  but holds a click in a tempoarary spaces before the user commits to it

When a record is confirmed by the user, it is added to the markerlist array
the markerlist array can be cleared using the clear-marker-list button

basic css in the MapView.css file makes the buttons look nice

Challenges:
  not overwriting the current marker when making a new marker.
    overcame by copying currentmarker into a marker array that keeps them
  Getting the website to render on render.com
    render always has issues but this was worse than usual. I know to npm start from my console, but trying to get render.com to do it was terrible
    

