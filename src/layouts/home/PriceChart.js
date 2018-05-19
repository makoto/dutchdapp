import React, { Component } from 'react'
import Chart from 'react-c3-component';
import 'c3/c3.css';
 
export default function PriceChart(data) {
    data = data.data.map((d)=>{ return parseInt(d)});
    let startPrice = data[0];
    let targetPrice = data[1];
    let currentPrice = data[2];
    let numParticipants = data[3];
    let threshold = data[4];
    let cap = data[5];
    let current_achivement = [];
    let price_points = [];
    let delta = (startPrice - targetPrice) / (cap - threshold);
    for(var i=0; i<numParticipants; i++){
        if(numParticipants < threshold){
            current_achivement.push(currentPrice);
        }else{
            current_achivement.push(currentPrice + delta);
        }
    }
    for(i=1; i<=cap; i++){
        if(i<threshold){
            price_points.push(startPrice);
        }else{
            let price_point = startPrice - (delta * (i - threshold));
            price_points.push(price_point);
        }
    }
    price_points.unshift('price points');
    current_achivement.unshift('current achivement');
    console.log('current_achivement', current_achivement);
    console.log('price_points', price_points);

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
                price_points,
                current_achivement
            ],
            types: {
                // 'max price'         : 'area',
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
                max: startPrice,
                min: targetPrice,
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