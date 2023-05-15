# Terribly Tiny Tales Assignment

#### Uphar Garg | 12006715 | uphargarg0510@gmail.com

<br>

## Hosted Link:
https://uphar-garg-ttt-assignment.netlify.app/

## Task:
Develop a frontend in React JS or Next JS, which does the following:

1. On first load, only has a Submit button.

2. On clicking on Submit, it will fetch the contents/data of https://www.terriblytinytales.com/test.txt

3. Parse the content and find the frequency of occurrence of each word (some words will occur only once, some twice and so on, and some will occur N times).

4. Then on the frontend, plot a histogram of the 20 most occurring words.

5. Also build an "Export" button, which when clicked will download a CSV file of the histogram data.

X-axis = top 20 words with highest occurrence 
<br>
Y-axis = how many times they occurred in the file

<br>


## Explanation Of The Assignment:

<br>

## Import : 

The React, useState and useEffect are imported from the React library.

chart.js from Chart.js library, which is used for creating charts and graphs.

papaparse is used for parsing and generating CSV files.

<br>

## Command to install chart.js :

 ```
 npm install chart.js
 ``` 


## Command to install papaparse :
```
 npm install papaparse 
```
 
 <br>

## Code Flow : 

1. On first load, the interface only displays a "Submit" button.
2. When the "Submit" button is clicked, it triggers the `handleSubmit` function.
3. Inside `handleSubmit`, an HTTP request is made to fetch the contents of the URL `https://www.terriblytinytales.com/test.txt` using axios function.
4. The fetched content is then parsed into individual words using the regular expression `/\W+/`, which splits the content based on non-word characters (e.g., punctuation, spaces).
5. The code calculates the frequency of occurrence for each word by iterating over the words and updating the `wordFreq` object.
6. The `topWords` variable is created by sorting the `wordFreq` object based on the frequency of occurrence and selecting the top 20 words.
7. The `topWords` data is set to the `topWords` state variable using the `setTopWords` function.
8. The loading state is toggled by setting `loading` to `true` and then back to `false` after fetching and processing the data.
9. The histogram is rendered on the frontend using Chart.js. The X-axis represents the top 20 words with the highest occurrence, and the Y-axis represents the frequency of occurrence.
10. An "Export" button is included, and when clicked, it triggers the `handleExport` function.
11. Inside `handleExport`, the `topWords` data is converted to a CSV format using PapaParse.
12. The CSV data is then downloaded as a file named "word-count-data.csv" using the HTML5 `Blob` and `URL.createObjectURL` APIs.

Hence, This is the desired actions of fetching content, calculating word frequency, displaying a histogram, and enabling CSV export based on user interactions.

<br>

# Code Output on load

![one](https://github.com/SupritiVats/Terribly_Tiny_Tales_Assignment/assets/97901522/77e9c597-fb50-4b5f-996e-3e5bef85f373)

<br>

# Code Output on clicking on submit button
#### It displays the histogram depicting words count and the words.

![two](https://github.com/SupritiVats/Terribly_Tiny_Tales_Assignment/assets/97901522/49657030-58e3-45fc-ad65-63235309e0e8)

<br>

# Code Output on clicking on export button  
#### It gets all top 20 most frequently occurred words.

![three one](https://github.com/SupritiVats/Terribly_Tiny_Tales_Assignment/assets/97901522/ba9035e0-c1ed-494d-918d-6764fde455f7)

<br>

# word-count-data.csv File Output 

![three](https://github.com/SupritiVats/Terribly_Tiny_Tales_Assignment/assets/97901522/c14d8d3c-bf61-4245-bf1a-489031d11bb3)