import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import React, { memo } from 'react';

export const Waveform = memo( ({ data }) => {

  const graphName = 'Wavoform'

  const label = ['x', 'y1', 'y2', 'y3'];
  const dataValid = data.length != 0;
  const data_json = dataValid? data.map((row, i) => ({ name: label[i], data: row })) : [];
  const xLabel = dataValid? data_json[0].data : [];
  const series = dataValid? data_json.slice(1) : [];

  const options = {
    chart: {
      type: 'line',
      height: 350,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: false,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      zoom: {
        enable: true
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -20,
        tools: {
          download: false,
        },
        export: {
          csv: { filename: graphName },
          svg: { filename: graphName },
          png: { filename: graphName }
        }
      },
    },
    stroke: {
      curve: 'straight',
      width:1
    },
    title: {
      text: 'Time series',
      align: 'left'
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -15,
      offsetX: -5
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: 'numeric',
      categories: xLabel,
      title: {
        text: 'x'
      },
      tickAmount: 10,
      tickPlacement: 'on',
      labels: {
        offsetY: 0
      },
      decimalsInFloat: 3
    },
    yaxis: {
      title: {
        text: 'y'
      },
      decimalsInFloat: 3
    }
  };

  return (
    <>
      <ApexChart options={options} series={series} type="line" height={350} />
    </>
  )
})