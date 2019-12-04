# INF554 Final Presentation 

## **Group Name**: Triple Y 
- Shuting Ye: yeshutin@usc.edu
- Yuxin Liu: liuyuxin@usc.edu
- Xinyang Zhang: xinyangz@usc.edu

## Slide 1. Cover Slide
- Title: Strategy behind trending Youtube videos
- Group name: TripleY
- names and emails

## Slide 2. 
- Our visualization project is about finding the strategy behind trending Youtube videos. 
- It is addressed to Youtubers and Youtube audiences.
- We discover the insights and pattern of this dataset and want people to get inspirations from our work.
    - Best time to publish
    - Time between publishing and becoming trending
    - Popular tags 
    - comments, views... among countries and categories

## Slide 3. How we work together
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


## Slide 4.
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

## Slide 5-12 Our Charts

## Slide 13-14
- Others:
    - More about data cleaning and simple charts to show general data distribution from different aspects
    - Use machine learning model to predict popular videos tags
    - Too dense without layouts
- Our work:
    - After data prepocessing, we divide topics and use layouts to show different aspects
    - Changable axis make maps more prominent
    - Use hover, legends and tooltips to show specific info of every element
    - Use transition and interactive charts to implement comparion

## Slide 15 Tools Summary 1
Data Processing Tools:
- Natural Language Toolkit: nltk
- Pandas, Numpy
- Seaborn, Matplotlib

## Slide 16 Tools Summary 2
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

## 










