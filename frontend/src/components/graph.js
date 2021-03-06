import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import statService from '../services/stats';

const GraphComponent = ({ data }) => {
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchStats = async (players) => {
      const vals = [];
      const res = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const player of players) {
        res.push(statService.getOnePlotly(player, data.startAt, data.endAt, 'kd'));
      }

      Promise.all(res).then((values) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const val of values) {
          vals.push({
            ...val,
            mode: 'Scatter + Lines',
          });
        }

        setTestData(vals);
        setLoading(false);
      });
    };

    if (data) {
      fetchStats(data.players);
    }
  }, [data]);

  if (!loading) {
    return (
      <div>
        <Plot
          data={testData}
          layout={{ width: 1000, height: 800, title: 'Graph' }}
        />
      </div>
    );
  }

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default GraphComponent;
