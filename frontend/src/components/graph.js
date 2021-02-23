/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import Plot from 'react-plotly.js';

import statService from '../services/stats';

const graphWidth = '1100px';
const graphHeight = '700px';

/*
  TODO ASAP: screw recharts, plotly.js seems way better overall
*/
const GraphComponent = ({ data }) => {
  const [stats, setStats] = useState(null);
  const [testData, setTestData] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Spaghetti code
    const fetchStats = async (players) => {
      console.log(data);
      const vals = {};
      const res = [];
      const testVals = [];
      const testRes = [];

      // --------- TEST ----------------

      // eslint-disable-next-line no-restricted-syntax
      for (const player of players) {
        testRes.push(statService.getOnePlotly(player, data.startAt, data.endAt, 'kd'));
      }

      Promise.all(testRes).then((values) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const val of values) {
          console.log('testval', val);
          testVals.push({ ...val, mode: 'Scatter + Lines' });
        }

        setTestData(testVals);
        setLoading(false);
      });

      // --------- ACTUAL ---------------

      // // eslint-disable-next-line no-restricted-syntax
      // for (const player of players) {
      //   res.push(statService.getOne(player, data.startAt, data.endAt));
      // }

      // Promise.all(res).then((values) => {
      //   // eslint-disable-next-line no-restricted-syntax
      //   for (const val of values) {
      //     if (val[0] !== undefined) {
      //       vals[val[0].nickname] = val;
      //     }
      //   }
      //   setStats(vals);

      //   setLoading(false);
      //   return res;
      // });
    };

    if (data) {
      fetchStats(data.players);
    }
  }, [data]);

  const dateFormat = (unix) => {
    // eslint-disable-next-line radix
    const d = new Date(parseInt(unix) * 1000);
    const dS = d.toDateString();
    return dS;
  };

  // const customMouseOver = (e) => {
  //   const x = Math.round(e.cx);
  //   const y = Math.round(e.cy);
  //   setTooltipPos({ x: x - 120, y: y - 140 });
  //   console.log(stats);

  //   setShowTooltip(true);
  //   setTooltipData(e.payload);
  // };

  // const afterMouseOver = () => {
  //   setShowTooltip(false);
  //   setTooltipData('');
  //   setTooltipPos({ x: 0, y: 0 });
  // };

  if (!loading) {
    // // Custom tooltip
    // const tooltipStyle = {
    //   transform: `translate(${tooltipPos.x + 125}px, ${tooltipPos.y - 540}px)`,
    //   backgroundColor: 'lightgrey',
    //   width: '130px',
    //   paddingLeft: '20px',
    // };

    // Should find a better way to make a fixed graph
    const containerStyle = {
      height: graphHeight,
      width: graphWidth,
      overflow: 'hidden',
      paddingTop: '20px',
    };

    // // Gets min and max ticks from all stats, gets min and max from those.
    // // Calculates ticks starting from min and adds +1 day until max is reached
    // const getTicks = (get) => {
    //   const maxTicks = [];
    //   const minTicks = [];
    //   const allTicks = [];
    //   // eslint-disable-next-line no-restricted-syntax, guard-for-in
    //   for (const player in stats) {
    //     // eslint-disable-next-line prefer-spread
    //     const max = Math.max.apply(Math, stats[player].map((o) => o.timestamp));
    //     maxTicks.push(max);
    //     // eslint-disable-next-line prefer-spread
    //     const min = Math.min.apply(Math, stats[player].map((o) => o.timestamp));
    //     minTicks.push(min);
    //   }

    //   const maxTick = Math.max(...maxTicks);
    //   const minTick = Math.min(...minTicks);

    //   switch (get) {
    //     case 'max': return maxTick;
    //     case 'min': return minTick;
    //     case 'all':
    //       for (let i = minTick; i <= maxTick; i += 86400) {
    //         allTicks.push(i);
    //       }
    //       return allTicks;
    //     default:
    //       return null;
    //   }
    // };

    return (
      <div>
        {/* <LineChart width={1000} height={600}>
          <CartesianGrid stroke='#ccc' />
          <XAxis
            type='number'
            dataKey='timestamp'
            tickFormatter={(label) => `${dateFormat(label)}`}
            ticks={getTicks('all')}
            domain={[getTicks('min'), getTicks('max')]}
          />
          <XAxis />
          <YAxis />
          <Tooltip cursor={false} wrapperStyle={{ display: 'none' }} />
          {
            Object.keys(stats).map((key) => (
              <Line
                key={key}
                data={stats[key]}
                dataKey='kd'
                stroke='#ffffff'
                activeDot={{ onMouseOver: customMouseOver, onMouseLeave: afterMouseOver }}
              />
            ))
          }
        </LineChart> */}
        {/* { showTooltip
          ? (
            <div style={tooltipStyle}>
              <p>
                {`
              Name: ${tooltipData.nickname}
              Kd: ${tooltipData.kd}
              Kr: ${tooltipData.kr}
              `}
              </p>
            </div>
          )
          : null} */}

        <Plot
          data={testData}
          layout={{ width: 1000, height: 800, title: 'Test Plotly' }}
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
