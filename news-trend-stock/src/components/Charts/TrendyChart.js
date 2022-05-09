import React from 'react'

import { Line } from 'react-chartjs-2';

        // const data = {
        //   labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
        //   datasets: [
        //     {
        //       label: "My First dataset",
        
        //       data: [1500000, 3900000, 3000000, 4100000, 2300000, 1800000, 2000000]
        //     }
        //   ]
        // };

function TrendyChart(chartData) {
  console.log("insideTrendyChart",chartData)


    return(

      <div>
        <Line data={chartData.chartData} height={"350%"} options={{ maintainAspectRatio: false }}/>
        
      </div>
    )
  }
    


export default TrendyChart