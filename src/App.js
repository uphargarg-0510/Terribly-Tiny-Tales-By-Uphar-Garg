import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import DownloadExe from 'papaparse';
import axios from 'axios'

function App() {
  const [topWords, setTopWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await axios.get('https://www.terriblytinytales.com/test.txt');
    const text = response.data;

    const words = text.split(/\W+/);
    const wordFreq = {};

    for (let word of words) {
      if (word) {
        word = word.toLowerCase();
        wordFreq[word] = wordFreq[word] ? wordFreq[word] + 1 : 1;
      }
    }

    const topWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 20);

    setTopWords(topWords);
    setLoading(false);
  };

  const handleExport = (event) => {
    event.preventDefault();
    const csv = DownloadExe.unparse(topWords, { header: ['Word', 'Count'] });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word-count-data.csv';
    a.click();
  };

  React.useEffect(() => {
    if (topWords.length) {
      const labels = topWords.map(([word, count]) => word);
      const data = topWords.map(([word, count]) => count);

      const histogram = new Chart(document.getElementById('histogram'),
        {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'count of words',
              data,
              backgroundColor: '#bed7c4',
              borderColor: '#277a3d',
              borderWidth: 3
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 17,
                  }
                }
              },
              y: {
                ticks: {
                  font: {
                    size: 17,
                  }
                }
              }
            }
          }
        }
      );

      return () => {
        histogram.destroy();
      };
    }
  }, [topWords]);

  return (
    <div>
      <div style={{ color: '#277a3d', fontFamily: 'Lato sans-serif', textAlign: 'center' }}>
        <h1>Terribly Tiny Tales Assignment by Uphar Garg</h1>
      </div>

      <div>

        <div style={topWords.length > 0 ? { marginLeft: '650px' } : { marginLeft: '700px' }}>

          <form onSubmit={handleSubmit}>

            <button
              type="submit"
              style={{
                width: '100px',
                height: '40px',
                backgroundColor: '#277a3d',
                color: 'white',
                borderRadius: '50px',
                border: 'none',
                fontSize: '15px',
              }}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>

            {
              topWords.length > 0 && (
                <button
                  onClick={handleExport}
                  style={{
                    width: '100px',
                    height: '40px',
                    backgroundColor: '#277a3d',
                    color: 'white',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '15px',
                    marginLeft: '50px'
                  }}
                >
                  Export
                </button>
              )
            }

          </form>



        </div>

        {
          topWords.length > 0 && (
            <div style={{ width: '100%', height: '100%', }}>
              <span
                style={{
                  fontSize: '11px',
                  position: 'absolute',
                  marginLeft:'90px',
                  marginTop:'190px'
                }}
              >
                Y-Axis <br />
                No. of times word occur
              </span>

              <div style={{ width: '70%', height: '70%', marginLeft: '250px', marginTop: '30px' }}>
                <canvas id="histogram"></canvas>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  position: 'absolute',
                  marginLeft:'720px',
                  marginTop:'-20px'
                }}
              >
                X-Axis <br />
                No. of times word occur
              </span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
