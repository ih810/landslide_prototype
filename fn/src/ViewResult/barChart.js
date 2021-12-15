import React, { useState, useEffect } from "react";

//chart visualization
import * as d3 from "d3";
import "./barChart.module.css";


const BarChart = (props) => {
  console.log('props', props)
  useEffect(()=>{
    //define barcharts bounds
    var margin = {top: 20, right: 40, bottom: 0, left: 50},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    //define style
    var greyColor = "#898989";
    var barColor = d3.rgb('#459BBA');
    var highlightColor = d3.rgb('#459BFA');

    //define format
    var formatPercent = d3.format(".0%");

    //clear old data before append
    d3.selectAll("svg > *").remove();

    //append graph
    var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //insert range
    var x = d3.scaleBand()
        .range([0, width])
            .padding(0.4);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x).tickSize([]).tickPadding(10);
    var yAxis = d3.axisLeft(y).tickFormat(formatPercent);

    //handleData
    if (props.chartMap) {
      console.log('render')
        const chartData = [];
        for (const value in props.chartMap) {
          if (value !== "len") {
            chartData.push({
              susValue: value,
              count: props.chartMap[value] / props.chartMap["len"],
            });
          }
        }
        var dataset = chartData;
        console.log('render',dataset)

        //display data
        x.domain(dataset.map( d => { return d.susValue; }));
        y.domain([0, d3.max(dataset,  d => { return d.count; })]);
        // y.domain([0, 1]);
    
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class","y axis")
            .call(yAxis);

        svg.selectAll(".bar")
            .data(dataset)
            .enter().append("rect")
            .attr("class", "bar")
            .style("display", d => { return d.count === null ? "none" : null; })
            .style("fill",  d => { 
                return d.count === d3.max(dataset,  d => { return d.count; }) 
                ? highlightColor : barColor
                })
            .attr("x",  d => { return x(d.susValue); })
            .attr("width", x.bandwidth())
                .attr("y",  d => { return height; })
                .attr("height", 0)
                    .transition()
                    .duration(900)
                    .delay(function (d, i) {
                        return i * 150;
                    })
            .attr("y",  d => { return y(d.count); })
            .attr("height",  d => { return height - y(d.count); });
    
        svg.selectAll(".label")        
            .data(dataset)
            .enter()
            .append("text")
            .attr("class", "label")
            .style("display",  d => { return d.count === null ? "none" : null; })
            .attr("x", ( d => { return x(d.susValue) + (x.bandwidth() / 2) -8 ; }))
                .style("fill",  d => { 
                    return d.count === d3.max(dataset,  d => { return d.count; }) 
                    ? highlightColor : greyColor
                    })
            .attr("y",  d => { return height; })
                .attr("height", 0)
                    .transition()
                    .duration(900)
                    .delay((d, i) => { return i * 150; })
            .text( d => { return formatPercent(d.count); })
            .attr("y",  d => { return y(d.count) + .1; })
            .attr("dy", "-.3em"); 

          svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width/2)
            .attr("y", height + 40)
            .text("Suspectibility");
  
          svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("y", -50)
            .attr("x", -100)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("frequency (%)");
  
      }
    }, [props.chartMap])

  return (
    <>
      <div className="graphContainer">
        <svg />
      </div>
    </>
  );
};
export default BarChart;