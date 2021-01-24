import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

import statService from '../services/stats';

const graphWidth = '1100px';
const graphHeight = '700px';

const GraphComponent = ({ data }) => {
  const [stats, setStats] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Spaghetti code, there's a better way to do this i'm sure
    const fetchStats = async (players) => {
      const vals = {};
      const res = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const player of players) {
        res.push(statService.getOne(player));
      }

      Promise.all(res).then((values) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const val of values) {
          vals[val[0].nickname] = val;
        }
        setStats(vals);
        setLoading(false);
        return res;
      });
    };

    if (data) {
      fetchStats(data.players);
    }
  }, []);

  const dateFormat = (unix) => {
    // eslint-disable-next-line radix
    const d = new Date(parseInt(unix) * 1000);
    const dS = d.toDateString();
    return dS;
  };

  const customMouseOver = (e) => {
    const x = Math.round(e.cx);
    const y = Math.round(e.cy);
    setTooltipPos({ x: x - 120, y: y - 140 });

    setShowTooltip(true);
    setTooltipData(e.payload);
  };

  const afterMouseOver = () => {
    setShowTooltip(false);
    setTooltipData('');
    setTooltipPos({ x: 0, y: 0 });
  };

  if (!loading && stats !== null) {
    // Custom tooltip
    const tooltipStyle = {
      transform: `translate(${tooltipPos.x + 125}px, ${tooltipPos.y - 540}px)`,
      backgroundColor: 'lightgrey',
      width: '130px',
      paddingLeft: '20px',
    };

    // Should find a better way to make a fixed graph
    const containerStyle = {
      height: graphHeight,
      width: graphWidth,
      overflow: 'hidden',
      paddingTop: '20px',
    };

    // Gets min and max ticks from all stats, gets min and max from those.
    // Calculates ticks starting from min and adds +1 day until max is reached
    const getTicks = (get) => {
      const maxTicks = [];
      const minTicks = [];
      const allTicks = [];
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const player in stats) {
        // eslint-disable-next-line prefer-spread
        const max = Math.max.apply(Math, stats[player].map((o) => o.timestamp));
        maxTicks.push(max);
        // eslint-disable-next-line prefer-spread
        const min = Math.min.apply(Math, stats[player].map((o) => o.timestamp));
        minTicks.push(min);
      }

      const maxTick = Math.max(...maxTicks);
      const minTick = Math.min(...minTicks);

      switch (get) {
        case 'max': return maxTick;
        case 'min': return minTick;
        case 'all':
          for (let i = minTick; i <= maxTick; i += 20 * 60 * 60) {
            allTicks.push(i);
          }
          return allTicks;
        default:
          return null;
      }
    };

    return (
      <div style={containerStyle}>
        <LineChart width={1000} height={600}>
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
          {/* <Line type='monotone' dataKey='kd' stroke="#8884d8" /> */}
        </LineChart>
        {/* Needs work on the tooltip... */}
        { showTooltip
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
          : null}
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
