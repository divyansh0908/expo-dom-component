"use dom";
import { Dimensions } from "react-native";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { Pie } from "@visx/shape";
import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";
import { AreaClosed } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { Polygon } from "@visx/shape";
import { Text } from "@visx/text";
import { GridRows, GridColumns } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { useState } from "react";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const data = [
  { name: "Jan", value: 400, value2: 240, value3: 280 },
  { name: "Feb", value: 300, value2: 430, value3: 210 },
  { name: "Mar", value: 500, value2: 340, value3: 290 },
  { name: "Apr", value: 280, value2: 300, value3: 440 },
  { name: "May", value: 590, value2: 450, value3: 380 },
  { name: "Jun", value: 490, value2: 380, value3: 430 },
];

const pieData = [
  { label: "A", value: 30 },
  { label: "B", value: 20 },
  { label: "C", value: 50 },
];
// Colors
const COLORS = ["#FFBB28", "#FF8042", "#8884D8"];

const BarChartComponent = ({
  width,
  height,
  margin = { top: 20, right: 20, bottom: 40, left: 50 },
}) => {
  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleBand({
    range: [0, innerWidth],
    domain: data.map((d) => d.name),
    padding: 0.2,
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, Math.max(...data.map((d) => Math.max(d.value, d.value2)))],
    nice: true,
  });

  return (
    <div>
      <h2 className="text-lg font-medium">Bar Chart</h2>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} stroke="#e0e0e0" />

          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickFormat={(d) => d}
            stroke="#333"
            tickStroke="#333"
            tickLabelProps={() => ({
              fill: "#333",
              fontSize: 12,
              textAnchor: "middle",
            })}
          />

          <AxisLeft
            scale={yScale}
            stroke="#333"
            tickStroke="#333"
            tickLabelProps={() => ({
              fill: "#333",
              fontSize: 12,
              textAnchor: "end",
              dx: -4,
              dy: 4,
            })}
          />

          {data.map((d, i) => (
            <Group key={`bar-${i}`} left={xScale(d.name)}>
              <rect
                x={xScale.bandwidth() / 4}
                y={yScale(d.value)}
                width={xScale.bandwidth() / 3}
                height={innerHeight - yScale(d.value)}
                fill="#8884d8"
              />
              <rect
                x={(xScale.bandwidth() * 5) / 12}
                y={yScale(d.value2)}
                width={xScale.bandwidth() / 3}
                height={innerHeight - yScale(d.value2)}
                fill="#82ca9d"
              />
            </Group>
          ))}
        </Group>
      </svg>
    </div>
  );
};

const LineChart = ({
  width,
  height,
  margin = { top: 20, right: 20, bottom: 40, left: 50 },
}) => {
  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleBand({
    range: [0, innerWidth],
    domain: data.map((d) => d.name),
    padding: 0.2,
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, Math.max(...data.map((d) => Math.max(d.value, d.value2)))],
    nice: true,
  });

  return (
    <div>
      <h2 className="text-lg font-medium">Line Chart</h2>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} stroke="#e0e0e0" />
          <GridColumns scale={xScale} height={innerHeight} stroke="#e0e0e0" />

          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickFormat={(d) => d}
            stroke="#333"
            tickStroke="#333"
            tickLabelProps={() => ({
              fill: "#333",
              fontSize: 12,
              textAnchor: "middle",
            })}
          />

          <AxisLeft
            scale={yScale}
            stroke="#333"
            tickStroke="#333"
            tickLabelProps={() => ({
              fill: "#333",
              fontSize: 12,
              textAnchor: "end",
              dx: -4,
              dy: 4,
            })}
          />

          <LinePath
            data={data}
            x={(d) => xScale(d.name) + xScale.bandwidth() / 2}
            y={(d) => yScale(d.value)}
            stroke="#8884d8"
            strokeWidth={2}
            curve={curveMonotoneX}
          />

          <LinePath
            data={data}
            x={(d) => xScale(d.name) + xScale.bandwidth() / 2}
            y={(d) => yScale(d.value2)}
            stroke="#82ca9d"
            strokeWidth={2}
            curve={curveMonotoneX}
          />

          {data.map((d, i) => (
            <Group key={`point-${i}`}>
              <circle
                cx={xScale(d.name) + xScale.bandwidth() / 2}
                cy={yScale(d.value)}
                r={4}
                fill="#8884d8"
              />
              <circle
                cx={xScale(d.name) + xScale.bandwidth() / 2}
                cy={yScale(d.value2)}
                r={4}
                fill="#82ca9d"
              />
            </Group>
          ))}
        </Group>
      </svg>
    </div>
  );
};

const PieChartComponent = ({ width, height }) => {
  const radius = Math.min(width, height) / 2;

  return (
    <div>
      <h2 className="text-lg font-medium">Pie Chart</h2>
      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={pieData}
            pieValue={(d) => d.value}
            outerRadius={radius}
            innerRadius={0}
            padAngle={0.02}
          >
            {(pie) =>
              pie.arcs.map((arc, i) => {
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const { label, value } = arc.data;

                return (
                  <g key={`arc-${label}`}>
                    <path d={pie.path(arc)!} fill={COLORS[i % COLORS.length]} />
                    <Text
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fill="#fff"
                      fontSize={12}
                      textAnchor="middle"
                    >
                      {label}
                    </Text>
                  </g>
                );
              })
            }
          </Pie>
        </Group>
      </svg>
    </div>
  );
};

const AreaChartComponent = ({
  width,
  height,
  margin = { top: 20, right: 20, bottom: 40, left: 50 },
}) => {
  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleBand({
    range: [0, innerWidth],
    domain: data.map((d) => d.name),
    padding: 0.2,
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [
      0,
      Math.max(...data.map((d) => Math.max(d.value, d.value2, d.value3))),
    ],
    nice: true,
  });

  return (
    <div>
      <h2 className="text-lg font-medium">Area Chart</h2>
      <svg width={width} height={height}>
        <LinearGradient
          id="area-gradient1"
          from="#8884d8"
          to="#8884d833"
          toOpacity={0.4}
        />
        <LinearGradient
          id="area-gradient2"
          from="#82ca9d"
          to="#82ca9d33"
          toOpacity={0.4}
        />

        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} stroke="#e0e0e0" />
          <GridColumns scale={xScale} height={innerHeight} stroke="#e0e0e0" />

          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickFormat={(d) => d}
            stroke="#333"
            tickStroke="#333"
            tickLabelProps={() => ({
              fill: "#333",
              fontSize: 12,
              textAnchor: "middle",
            })}
          />

          <AxisLeft
            scale={yScale}
            stroke="#333"
            tickStroke="#333"
            tickLabelProps={() => ({
              fill: "#333",
              fontSize: 12,
              textAnchor: "end",
              dx: -4,
              dy: 4,
            })}
          />

          <AreaClosed
            data={data}
            x={(d) => xScale(d.name) + xScale.bandwidth() / 2}
            y={(d) => yScale(d.value)}
            yScale={yScale}
            curve={curveMonotoneX}
            fill="url(#area-gradient1)"
            stroke="#8884d8"
            strokeWidth={2}
          />

          <AreaClosed
            data={data}
            x={(d) => xScale(d.name) + xScale.bandwidth() / 2}
            y={(d) => yScale(d.value2)}
            yScale={yScale}
            curve={curveMonotoneX}
            fill="url(#area-gradient2)"
            stroke="#82ca9d"
            strokeWidth={2}
          />
        </Group>
      </svg>
    </div>
  );
};

const RadarChartComponent = ({ width, height }) => {
  const radius = Math.min(width, height) / 2 - 40;
  const centerX = width / 2;
  const centerY = height / 2;

  const maxValue = Math.max(...data.map((d) => Math.max(d.value, d.value2)));

  // Create scales
  const angleScale = scaleLinear({
    domain: [0, data.length],
    range: [0, 2 * Math.PI],
  });

  const radiusScale = scaleLinear({
    domain: [0, maxValue],
    range: [0, radius],
  });

  // Calculate points for radar chart
  const getPoints = (dataKey) => {
    return data.map((d, i) => {
      const angle = angleScale(i);
      const distance = radiusScale(d[dataKey]);
      return {
        x: distance * Math.cos(angle - Math.PI / 2),
        y: distance * Math.sin(angle - Math.PI / 2),
      };
    });
  };

  const series1Points = getPoints("value");
  const series2Points = getPoints("value2");

  return (
    <div>
      <h2 className="text-lg font-medium">Radar Chart</h2>
      <svg width={width} height={height}>
        <Group top={centerY} left={centerX}>
          {/* Background circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
            <circle
              key={`circle-${i}`}
              r={radius * r}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth={1}
            />
          ))}

          {/* Spokes */}
          {data.map((d, i) => {
            const angle = angleScale(i);
            return (
              <line
                key={`spoke-${i}`}
                x1={0}
                y1={0}
                x2={radius * Math.cos(angle - Math.PI / 2)}
                y2={radius * Math.sin(angle - Math.PI / 2)}
                stroke="#e0e0e0"
                strokeWidth={1}
              />
            );
          })}

          {/* Labels */}
          {data.map((d, i) => {
            const angle = angleScale(i);
            const labelRadius = radius + 15;
            return (
              <Text
                key={`label-${i}`}
                x={labelRadius * Math.cos(angle - Math.PI / 2)}
                y={labelRadius * Math.sin(angle - Math.PI / 2)}
                textAnchor="middle"
                verticalAnchor="middle"
                fontSize={12}
              >
                {d.name}
              </Text>
            );
          })}

          {/* Data series */}
          <Polygon
            points={series1Points}
            fill="#8884d8"
            fillOpacity={0.3}
            stroke="#8884d8"
            strokeWidth={2}
          />

          <Polygon
            points={series2Points}
            fill="#82ca9d"
            fillOpacity={0.3}
            stroke="#82ca9d"
            strokeWidth={2}
          />

          {/* Data points */}
          {series1Points.map((point, i) => (
            <circle
              key={`point1-${i}`}
              cx={point.x}
              cy={point.y}
              r={4}
              fill="#8884d8"
            />
          ))}

          {series2Points.map((point, i) => (
            <circle
              key={`point2-${i}`}
              cx={point.x}
              cy={point.y}
              r={4}
              fill="#82ca9d"
            />
          ))}
        </Group>
      </svg>
    </div>
  );
};

export default function ChartComponent() {
  const [selectedChart, setSelectedChart] = useState("line");

  // Chart renderer based on selection
  const renderChart = () => {
    const width = windowWidth - 50;
    const height = 250;

    return (
      <>
        <LineChart width={width} height={height} />
        <BarChartComponent width={width} height={height} />
        <PieChartComponent width={width} height={height} />
        <AreaChartComponent width={width} height={height} />
        <RadarChartComponent width={width} height={height} />
      </>
    );
  };

  return (
    <div style={{ padding: 16, backgroundColor: "#f0f0f0", borderRadius: 8, overflow: "hidden" }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chart Dashboard</h1>
      </div>

      <div style={{ borderRadius: 8, backgroundColor: "#fff", padding: 6 }}>
        <div className="p-4 flex justify-center">{renderChart()}</div>
      </div>
    </div>
  );
}
