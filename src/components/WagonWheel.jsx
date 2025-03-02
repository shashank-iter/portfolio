import React from 'react'
import { useState } from 'react'
import { runsData1, runsData2, runsData3, legendData } from '@/data'

const WagonWheel = ({ radius = 200 }) => {
  const [showFieldLabel, setShowFieldLabel] = useState(true)
  const [showFieldAreaMarker, setShowFieldAreaMarker] = useState(true)
  const [runDataSets, setRunDataSets] = useState([
    runsData1,
    runsData2,
    runsData3,
  ])
  const [runDataIndex, setRunDataIndex] = useState(0)
  const [runsToShow, setRunsToShow] = useState([1, 2, 3, 4, 5, 6])

  const calculateLineProps = (runs, angle, initalLength) => {
    const radians = (angle * Math.PI) / 180
    let length, color

    switch (runs) {
      case 1:
        length = initalLength >= radius ? radius / 4 : initalLength
        color = 'white'
        break
      case 2:
        length = initalLength >= radius ? radius / 3 : initalLength
        color = 'yellow'
        break
      case 3:
        length = initalLength >= radius ? radius / 2 : initalLength
        color = 'indigo'
        break
      case 4:
        length = radius - 1.1
        color = 'blue'
        break
      case 6:
        length = radius - 1.1
        color = 'red'
        break
      default:
        length = radius / 4
        color = 'white'
    }

    return {
      x2: radius + length * Math.cos(radians),
      y2: radius - length * Math.sin(radians),
      color,
    }
  }

  function runFilter(runsToShow, runsData) {
    runsData = runsData.filter((run) => runsToShow.includes(run.runs))
    return runsData
  }

  const sectionAngles = Array.from({ length: 8 }, (_, i) => i * 45)
  const sectionNames = [
    'Deep Square Leg',
    'Deep Fine Leg',
    'Third man',
    'Deep Point',
    'Deep Cover',
    'Long Off',
    'Long On',
    'Deep Mid Wicket',
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <div className="relative ">
          {/* Outer Circle */}
          <div
            className="rounded-full border-4 border-solid border-green-600 bg-green-600 "
            style={{
              width: `${2 * radius}px`,
              height: `${2 * radius}px`,
            }}
          ></div>

          {/* Inner Circle (30-yard circle) */}
          <div
            className="absolute rounded-full bg-green-700"
            style={{
              width: `${radius}px`,
              height: `${radius}px`,
              top: `${radius / 2}px`,
              left: `${radius / 2}px`,
            }}
          ></div>

          {/* Center Rectangle */}
          <div
            className="absolute z-10 mt-3 rounded-sm bg-yellow-100"
            style={{
              width: '20px',
              height: '50px',
              top: `${radius - 25}px`,
              left: `${radius - 9}px`,
            }}
          ></div>

          {/* Lines for Runs */}
          <svg
            className="absolute left-0 top-0"
            width={2 * radius}
            height={2 * radius}
          >
            {runFilter(runsToShow, runDataSets[runDataIndex]).map(
              ({ runs, angle, length }, index) => {
                const { x2, y2, color } = calculateLineProps(
                  runs,
                  angle,
                  length
                )
                return (
                  <line
                    key={index}
                    x1={radius}
                    y1={radius}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )
              }
            )}

            {/* Section Dividers */}
            {showFieldAreaMarker &&
              sectionAngles.map((angle, index) => {
                const radians = (angle * Math.PI) / 180
                const x2 = radius + radius * Math.cos(radians)
                const y2 = radius - radius * Math.sin(radians)
                return (
                  <line
                    key={`section-${index}`}
                    x1={radius}
                    y1={radius}
                    x2={x2}
                    y2={y2}
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                )
              })}

            {/* Section Labels */}
            {showFieldLabel &&
              sectionAngles.map((angle, index) => {
                const radians = ((angle + 22.5) * Math.PI) / 180 // Offset by half a section for centering
                const x = radius + radius * 0.75 * Math.cos(radians) // Adjust distance from center
                const y = radius - radius * 0.75 * Math.sin(radians)
                {
                  /* console.log(
                  'Angle:',
                  angle,
                  'X:',
                  angle,
                  x,
                  index,
                  sectionNames[index]
                ) */
                }

                return (
                  <text
                    key={`label-${index}`}
                    x={x}
                    y={y}
                    fill="white"
                    fontSize="12"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-bold"
                  >
                    {sectionNames[index]}
                  </text>
                )
              })}
          </svg>
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col gap-x-2 gap-y-4 p-4 md:flex-row">
        <div className="flex w-64 flex-col items-start rounded-md bg-gray-100 p-4 shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Legend</h2>
          <ul className="space-y-2">
            {legendData.map((item, index) => (
              <li key={index} className="flex items-center space-x-3">
                {/* Color Indicator */}
                <div
                  className={`h-6 w-6 rounded-full ${item.color}`}
                  style={{
                    border: '1px solid black',
                  }}
                ></div>
                {/* Label */}
                <span className="text-sm font-medium text-gray-800">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full rounded-md border border-gray-300 p-4">
          <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
            Configuration
          </h2>
          <div className="grid grid-cols-1 space-y-2 md:grid-cols-3">
            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={showFieldLabel}
                className="h-4 w-4"
                checked={showFieldLabel}
                onChange={() => setShowFieldLabel(!showFieldLabel)}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Show Field Labels
              </label>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={showFieldAreaMarker}
                className="h-4 w-4"
                checked={showFieldAreaMarker}
                onChange={() => setShowFieldAreaMarker(!showFieldAreaMarker)}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Show Field Area Markers
              </label>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={runsToShow.includes(1)}
                className="h-4 w-4"
                checked={runsToShow.includes(1)}
                onChange={() => {
                  if (runsToShow.includes(1)) {
                    setRunsToShow(runsToShow.filter((run) => run !== 1))
                  } else {
                    setRunsToShow([...runsToShow, 1])
                  }
                }}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Show 1&apos;s
              </label>
            </div>

            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={runsToShow.includes(2)}
                className="h-4 w-4"
                checked={runsToShow.includes(2)}
                onChange={() => {
                  if (runsToShow.includes(2)) {
                    setRunsToShow(runsToShow.filter((run) => run !== 2))
                  } else {
                    setRunsToShow([...runsToShow, 2])
                  }
                }}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Show 2&apos;s
              </label>
            </div>

            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={runsToShow.includes(3)}
                className="h-4 w-4"
                checked={runsToShow.includes(3)}
                onChange={() => {
                  if (runsToShow.includes(3)) {
                    setRunsToShow(runsToShow.filter((run) => run !== 3))
                  } else {
                    setRunsToShow([...runsToShow, 3])
                  }
                }}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Show 3&apos;s
              </label>
            </div>

            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={runsToShow.includes(4)}
                className="h-4 w-4"
                checked={runsToShow.includes(4)}
                onChange={() => {
                  if (runsToShow.includes(4)) {
                    setRunsToShow(runsToShow.filter((run) => run !== 4))
                  } else {
                    setRunsToShow([...runsToShow, 4])
                  }
                }}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Show 4&apos;s
              </label>
            </div>

            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={runsToShow.includes(5)}
                className="h-4 w-4"
                checked={runsToShow.includes(5)}
                onChange={() => {
                  if (runsToShow.includes(5)) {
                    setRunsToShow(runsToShow.filter((run) => run !== 5))
                  } else {
                    setRunsToShow([...runsToShow, 5])
                  }
                }}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Show 5&apos;s
              </label>
            </div>

            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                defaultValue={runsToShow.includes(6)}
                className="h-4 w-4"
                checked={runsToShow.includes(6)}
                onChange={() => {
                  if (runsToShow.includes(6)) {
                    setRunsToShow(runsToShow.filter((run) => run !== 6))
                  } else {
                    setRunsToShow([...runsToShow, 6])
                  }
                }}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Show 6&apos;s
              </label>
            </div>
            <div>
              <button
                type="button"
                className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-1 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  // shuffle runDataIndex between values 0 to 2
                  setRunDataIndex(Math.floor(Math.random() * 3))
                }}
              >
                Shuffle Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WagonWheel
