# INF554 Final Presentation 

## **Group Name**: Triple Y 
- Shuting Ye: yeshutin@usc.edu
- Yuxin Liu: liuyuxin@usc.edu
- Xinyang Zhang: xinyangz@usc.edu

## Slide 1. Cover Slide
- Title: Strategy behind trending Youtube videos
- Group name: TripleY
- names and emails

## Slide 2. Project Background
- Youtube has the biggest market share, internet . 
 - More than 1.8 billion users every month; 100 hours of video uploaded every minute; More than 2.3 million Youtube channels
 - there are so many people have fun on that and also there are so many people live form it. 
 - Thus, if we can provide some useful information, it can help the youtubeer to make their video and make it more popular.  

## Slide 3. 
- Our visualization project is about finding the strategy behind trending Youtube videos. 
- It is addressed to Youtubers and Youtube audiences.
- We discover the insights and pattern of this dataset and want people to get inspirations from our work.
    - Best time to publish
    - Time between publishing and becoming trending
    - Popular tags 
    - comments, views... among countries and categories

## Slide 4. How we work together
- brainstorm: All members
- data preparation: All members
- construct data visualization: 
    - Shuting Ye: 
        1. Explore the most popular categories and tags(Bar chart and Wordcloud)
        2. The best time(weekdays or hours) to publish a Youtube video(Lollipop chart)
    - Xinyang Zhang: 
        1. Category temperature(World Map) 
        2. Each country's top 5 categories and worldwide top 5 categories' distribution(Donut chart)
    - Yuxin Liu: 
        1. Key factors influced time between publishing and trending(Bar Chart, Line Chart) 
        2. Basic attributes among countries and categories(Tree Map)
- video, paper and presentation:
    - Shuting Ye: Website construction
    - Xinyang Zhang: Paper
    - Yuxin Liu: Presentation & Video


## Slide 5.
- Data: The dataset we used is from [Kaggle](https://www.kaggle.com/datasnaek/youtube-new) and it contains following attributes of 9 countries:
    - video_id
    - trending_date
    - title
    - channel_title
    - category_id
    - publish_time
    - tags
    - views
    - likes
    - dislikes
    - comment_count
    - thumbnail_link
    - comments_disabled
    - ratings_disabled
    - video_error_or_removed
    - description
- Topic: 
    We used part of those attributes to extract useful information for our project. e.g. We splits tags from "tags" attribute and filtered with stop words of different languages. We calculate the time between publishing and trending to explore factors influced that.

## Slide 6 (Bar Chart)
This bar chart shows the popularity of each categories in world wide. When you click on each bar, word cloud will change along with the category you chose.

## Slide 7 (Word Cloud) 
We split tags into single phrases and filter with stop words. The animition of this chart is expanding from the most frequent tags to the less frequent tags and shaped in YouTube logo.

## Slide 8 (Lolipop Chart)
Lolipop chart shows the number of trending videos among weekdays or hours of publishing time. Buttons to show different kinds of sorting are available. The graph would show in the fluent transition.

## Slide 9 (Line Chart) 
This line chart shows average time between publishing and become trending among weekdays. You could use select box to show line of each country or all 9 countries. When you hover on each line, valuepoint with tooltip shows.

## Slide 10 (World Map)
The world map shows the worldwide top5 categories' popularity in different shades of colors. If the shade is darker which means people in this country like this category more. You could click buttons to choose different categories.

## Slide 11 (World Map + Nine Donut Chart)
The donut chart shows the proportional relationships of top 5 categories of 9 countries based on the world map.
If you hover on the chart, it would show the specific number of that category.

## Slide 12 (World Map + One_Donut Chart)
After presenting the worldwide top 5 categories, when you click on each country on the map, it shows top 5 categories of that country you just clicked. And also when you hover on each part, it would also show the specific number of that category.

## Slide 13 (Bar chart + filter)
This bar chart shows average time of becomming trending among 5 categories and 9 countries. You can see more information of each bar when you hover on it. You could also use filter to do comparison between categories and countries.

## Slide 14 (Tree Map)


## Slide 15 (Comparison 1 Line Chart)
We use select box to show line of each country and the axis will aytomatically changes along with data. You could also see lines of every country by click the check box. The line charts of same topic of other's work are shown separately and the x axis are not changable.

## Slide 16 (Comparison 2 Word Cloud)
We add hover tooltips to each tag and make them as YouTube Shape. Another tag word cloud from other's work is static.

## Slide 17 (Comparison 3 Tree Map)

## Slide 18 Visualization Wheel
- Others:
    - More about data cleaning and simple charts to show general data distribution from different aspects
    - Use machine learning model to predict popular videos tags
    - Too dense without layouts
- Our work:
    - After data prepocessing, we divide topics and use layouts to show different aspects
    - Changable axis make maps more prominent
    - Use hover, legends and tooltips to show specific info of every element
    - Use transition and interactive charts to implement comparion

The design of charts focus on the upper half of Cairo's visualization wheel. It has been built based on the design principles of Cairo's wheel. 
- It shows the different time, category, tag the trending videos common have.
- This helps the user to get a good overview of the overall data so that they can click to choose and know more detailed information, making it multi-dimensional. 
- Also, the visualization is highly functional instead of being decorative. The graphs are also not redundant and display novel aspects.

## Slide 19 Tools Summary 1
Data Processing Tools:
- Natural Language Toolkit: nltk
- Pandas, Numpy
- Seaborn, Matplotlib

## Slide 20 Tools Summary 2
- d3:
    - d3 map *1
    - responsive d3 charts *5
    - interactive d3 charts *5
    - d3 animated transitions *3
- Tableau:
    - Tree Map
    - Bar Chart
- Angular
- Bootstrap
- JS package: Word Cloud












