import React, { Component } from 'react'
import Chart from 'react-c3-component';
import 'c3/c3.css';
 
export default function PriceChart() {
  return (
    <Chart
      config={{
        transition: {
            duration: 0
        },
        size: {
            height: 240,
            width: 480
        },
        data: {
            columns: [
                ['price points', 120,120,110,100,90,80,70,60],
                ['current achivement', 90,90,90,90,90]
            ],
            types: {
                'max price'         : 'area',
                'current achivement': 'area-step'
            }
        },
        axis: {
            x: {
                label: {
                    text: 'Tickets sold',
                    position: 'inner-middle',
                },
            },
            y: {
                max: 120,
                min: 60,
                // padding: {top: 120, bottom: 50},
                label: {
                    text: 'Ticket price',
                    position: 'outer-center',
                },
                tick: {
                    // format: d3.format("ETH ")
                   format: function (d) { return "♦" + d; }
                }
            }
        }
    }}
    />
  )
}