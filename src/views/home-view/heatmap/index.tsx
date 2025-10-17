"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { type CryptoData as BaseCryptoData, generateCryptoData } from "@/lib/data";
import HeatMapTabs from "@/views/home-view/heatmap/heatmap-tabs";

interface CryptoData extends BaseCryptoData, d3.SimulationNodeDatum {
  radius: number;
  x: number;
  y: number;
}

export default function Heatmap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerWidth = 55 * 16;
  const containerHeight = 40 * 16;
  const [data, setData] = useState<CryptoData[]>([]);

  useEffect(() => {
    const rawData = generateCryptoData().map((d) => ({
      ...d,
      radius: 0,
      x: 0,
      y: 0,
    }));
    setData(rawData);
  }, []);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", containerWidth).attr("height", containerHeight);

    const values = data
      .map((d: CryptoData) => parseFloat(d.value.replace(/[$B,]/g, "")))
      .filter((v) => !isNaN(v));

    console.log("Extracted numeric values:", values);

    const radiusScale = d3
      .scaleSqrt<number, number>()
      .domain([d3.min(values) || 1, d3.max(values) || 100])
      .range([25, 180]);

    const sortedData = data
      .map((d: CryptoData) => ({
        ...d,
        radius: radiusScale(parseFloat(d.value.replace(/[$B,]/g, ""))),
      }))
      .sort((a, b) => b.radius - a.radius);

    const leftData = sortedData.filter((d: CryptoData) => d.radius >= 100);
    const centerData = sortedData.filter((d: CryptoData) => d.radius >= 30 && d.radius < 100);
    const rightData = sortedData.filter((d: CryptoData) => d.radius <= 30);

    leftData.forEach((d: CryptoData, i: number) => {
      d.x = d.radius * 0.8;
      d.y = containerHeight / 2 + (i - leftData.length / 2) * d.radius * 1.2;
    });

    centerData.forEach((d: CryptoData, i: number) => {
      const angle = (i / centerData.length) * Math.PI * 2;
      const spiralRadius = Math.sqrt(i + 1) * (containerWidth / Math.sqrt(centerData.length));
      d.x = containerWidth / 2 + Math.cos(angle) * spiralRadius * 0.5;
      d.y = containerHeight / 2 + Math.sin(angle) * spiralRadius * 0.5;
    });

    const rightStartY = 50;
    rightData.forEach((d: CryptoData, i: number) => {
      d.x = containerWidth - 80;
      d.y = rightStartY + i * (d.radius * 2.5);
    });

    const simulation = d3
      .forceSimulation<CryptoData>([...leftData, ...centerData, ...rightData])
      .force("collision", d3.forceCollide<CryptoData>().radius((d) => d.radius).strength(1))
      .force("x", d3.forceX<CryptoData>((d) => {
        if (leftData.includes(d)) {
          return d.radius * 0.8;
        } else if (rightData.includes(d)) {
          return containerWidth - d.radius * 5;
        } else {
          return containerWidth / 2;
        }
      }).strength(0.2))
      .force("y", d3.forceY<CryptoData>(containerHeight / 2).strength(0.2))
      .alpha(1)
      .restart();

    const groups = svg.selectAll<SVGGElement, CryptoData>("g").data([...leftData, ...centerData, ...rightData]).enter().append("g");

    groups.append("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => d.color);

    groups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.3em")
      .attr("fill", "white")
      .attr("font-size", (d) => `${Math.max(d.radius / 4, 10)}px`)
      .attr("font-weight", "bold")
      .text((d) => d.id.toUpperCase());

    groups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("fill", "white")
      .attr("font-size", (d) => `${Math.max(d.radius / 6, 8)}px`)
      .text((d) => d.value.toUpperCase());

    simulation.on("tick", () => {
      groups.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data, containerWidth, containerHeight]);

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <div className="flex flex-col h-fit items-start justify-start mt-10">
        <div className="relative">
          <h1 className="text-5xl text-[#0303031f] absolute bottom-3.5 font-black left-0">Heatmaps</h1>
          <div className="flex flex-row items-center space-x-1">
            <div className="w-2 h-5 bg-primary"></div>
            <h1 className="text-3xl font-medium">Cryptocurrency Heatmaps</h1>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
      {/* Tabs Section */}
      <div className="w-fit flex justify-start">
        <HeatMapTabs />
      </div>

      {/* SVG Heatmap Container */}
      <div className="flex items-center justify-center bg-[#84d8e9] rounded-2xl border-4 border-[#B8B8B8] w-full h-auto">
        <svg
          ref={svgRef}
          className="bg-[#84D8E961] rounded-2xl w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        />
      </div>
      </div>

    </div>
  );
}
