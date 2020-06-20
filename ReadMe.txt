# used packages: pg express nouislider (should be installed automatically on "yarn install"
setup and run the server:


[Project link](https://anime-visual.herokuapp.com/)

run in terminal at assignemnt directory:
psql -U a3user -d a3db -f addTables.sql
yarn install
node index.js
# visit "http://localhost:8080/"

visualizations implemented:
the visualization is about animes.
1 visualization that correlates between anime's rank (based on user score aggregate) on the x axis and the anime's number of views by all users 
 on the y axis. ( the number of views only includes people who set the anime as completed in their account)
anime movies show up as red circles while anime tv shows show up as blue circles.
when you hover over a circle, it changes to green color and displays the anime's name in a tooltip.
interactions:
1. rank slider:
    the range of the rank of the shown points gets filtered according to the range of the slider.
    this slider can be dragged, expanded and shrunk. (the maximum allowed range of expansion is 750. graph will be too cluttered if more is allowed)
2. two checkboxs:
    one for movies and one for TV shows. toggling them will affect which is shown in the vizualization.

rationale
visual encoding pick:
the first thing i did after downloading the dataset is use tableau on it.
i chose the rank of the anime as the x axis and the number of views on the y axis.

tableau automatically picked a bar chart for it and it looked pretty good so i set on implementing a barchart.
I did implement it but I later recalled that from the readings and class that position is better than length
and since I have quantitative data on both axis then using a scatterplot will produce a more accurate graph.
(as scatterplot uses position encoding)

Another aspect that made me rethink the  barchart is the fact that I couldn't increase the slider
filter range to more than 100 because the bars were getting too small and I could barely hover the mouse
over them in order to show the title as a tooltip.

interaction technique pick:
I added the checkboxes of TV and Movies because most people when they look for an anime they won't settle
for either a movie or a tv show, they know that they specifically want to watch a movie or a show.
so these checkboxes help the user focus on data relevant to them  (also personally I always search
for shows and I'm not very interested in movies and I was hoping to use this tool to find good animes more easily as it's been
a while since i watched a good one :) )
I added the slider bar because having all the data at once is too much and the visualization will be
too cluttered. moving the slider around, shrinking and exapnding it is a natural way to explore which animes
to watch.
for example you look at the top viewed animes in the initial rank range, you might know most of these animes
because they are popular. so you slide the range a bit to the right and start exploring more animes.
You start looking at outliers, animes located at the  top half of the y axis (lots of views) and the right half of the x axis (low rank
in terms of current range filter). I call these animes "hidden gem" animes. this was
essentialy my motivation for picking this particular dataset and choosing the slider interaction)

before thinking of a slider, I thought i'd have 2 values for min and max rank with fields that i can fill in.
and filling in these fields will update the filters but it isn't as intuitive and natural as manipulating a slider. that's why i ended
up implementing it as a slider.

back-end:
I went with a simple node.js file using express and node-js.
I was thinking of using python for the webserver because I'm familar with python but since I am not 
really familar with how to build a server in python, I decided to go with node.js as I wanted to learn
more about java script. moreover it felt like it will be easier for me if both the client and server side were implemented
in the same language.

development process:
number of hours:
I worked on it for at least 14 days and probably 4 hours on average each day so about 56 hours.
what took most of my time:
was just learning javascript and all the libraries/packages that i can use.
there were so many ways to solve this and the number of options was overwhelming.
I just spent a lot of time reading material from w3schools and trying basic things
to get the hang of it.
also it was challenging to learn how to use d3 but examples online really helped.
Furthermore, in theory I knew how a client and server should communicate with each other
but when i needed to write both i thought a lot about which to start implementing first.
I ended up starting with a very barebones server and then adding code to both the client and the server
iteratively after that.
one thing I forgot to mention earlier is data wrangling:
at first the data looked ready to go. (didn't have to change anything in order to use it on tableau)
but it was difficult to add it to postgres. because some lines would suddenly have more attributes, some were empty
and some lines even had the same number of attributes but they didn't makes sense.
it took me about 3 days to make it ready for postgres.

