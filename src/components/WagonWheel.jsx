import React from 'react'
import { useState, useEffect } from 'react'
import { runsData1, runsData2, runsData3, legendData } from '@/data'
import toast from 'react-hot-toast'
import useScreenWidth from '@/hooks/useScreenWidth'

const WagonWheel = ({ radius, setRadius }) => {
  const [showFieldLabel, setShowFieldLabel] = useState(true)
  const [showFieldAreaMarker, setShowFieldAreaMarker] = useState(true)
  const [runDataSets] = useState([runsData1, runsData2, runsData3])
  const [runDataIndex, setRunDataIndex] = useState(0)
  const [runsToShow, setRunsToShow] = useState([1, 2, 3, 4, 5, 6])
  const [animationTrigger, setAnimationTrigger] = useState(0)

  const handleNextIndex = () => {
    setRunDataIndex((prevIndex) => (prevIndex + 1) % 3)
    setAnimationTrigger((prev) => prev + 1)
  }

  const windowWidth = useScreenWidth()

  // Responsive window resize handler

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
      case 5:
        length = initalLength >= radius ? radius / 2 : initalLength
        color = 'cyan'
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
      length,
      radians,
    }
  }

  function runFilter(runsToShow, runsData) {
    return runsData.filter((run) => runsToShow.includes(run.runs))
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
    <div className="w-full px-2 sm:px-4">
      <div className="my-10 flex w-full flex-col items-start rounded-md bg-gray-100 p-4  shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Legend</h2>
        <ul className="flex flex-row flex-wrap gap-2 ">
          {legendData.map((item, index) => (
            <li key={index} className="flex items-center gap-x-3">
              <div
                className={`h-6 w-6 rounded-full ${item.color}`}
                style={{
                  border: '1px solid black',
                }}
              ></div>
              <span className="text-sm font-medium text-gray-800">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <div
          className="relative"
          style={{ width: `${2 * radius}px`, height: `${2 * radius}px` }}
        >
          {/* Outer Circle */}
          <div
            className="rounded-full border-4 border-solid border-green-600 bg-green-600"
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
                const {
                  x2,
                  y2,
                  color,
                  length: calculatedLength,
                  radians,
                } = calculateLineProps(runs, angle, length)
                const lineLength = Math.sqrt(
                  Math.pow(x2 - radius, 2) + Math.pow(y2 - radius, 2)
                )

                console.log(
                  'radius',
                  radius,
                  'length',
                  length,
                  'x2',
                  x2,
                  'y2',
                  y2
                )

                return (
                  <line
                    key={`${index}-${animationTrigger}`}
                    x1={radius}
                    y1={radius}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={lineLength}
                    strokeDashoffset={lineLength}
                    className="animate-draw"
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
                const radians = ((angle + 22.5) * Math.PI) / 180
                const x = radius + radius * 0.75 * Math.cos(radians)
                const y = radius - radius * 0.75 * Math.sin(radians)

                return (
                  <text
                    key={`label-${index}`}
                    x={x}
                    y={y}
                    fill="white"
                    fontSize="12"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`${
                      radius >= 150 && radius <= 200 ? 'text-[9px]' : ''
                    } font-normal ${
                      radius > 200 && radius <= 250 ? 'sm:text-xs' : ''
                    } ${radius > 250 ? 'md:text-sm' : ''}`}
                  >
                    {sectionNames[index]}
                  </text>
                )
              })}
          </svg>
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col gap-x-2 gap-y-4 p-4 md:flex-row">
        <div className="w-full rounded-md border border-gray-300 p-4">
          <h2 className="mb-4 flex justify-between text-lg font-semibold text-black dark:text-white ">
            Configuration{' '}
          </h2>
          <div className="mb-4 flex flex-col gap-x-2 gap-y-2 sm:flex-row">
            <button
              type="button"
              className=" w-fit rounded-lg bg-blue-700 px-5 py-1 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                handleNextIndex()
                setAnimationTrigger((prev) => prev + 1)
              }}
            >
              Shuffle Data
            </button>
            <button
              type="button"
              className=" w-fit rounded-lg bg-blue-700 px-5 py-1 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  disabled:bg-slate-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                if (windowWidth <= 600 && radius >= 180) {
                  toast("You can't zoom in more for mobile screen!")
                  return
                }
                if (radius >= 300) {
                  toast("You can't zoom in more!")
                  return
                } else {
                  setRadius(radius + 10)
                }
              }}
            >
              Zoom In
            </button>
            <button
              type="button"
              className=" w-fit rounded-lg bg-blue-700 px-5 py-1 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                if (radius <= 150) {
                  toast("You can't zoom out more!")
                  return
                } else {
                  setRadius(radius - 10)
                }
              }}
            >
              Zoom Out
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={showFieldLabel}
                onChange={() => setShowFieldLabel(!showFieldLabel)}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Field Labels
              </label>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={showFieldAreaMarker}
                onChange={() => setShowFieldAreaMarker(!showFieldAreaMarker)}
              />
              <label className="text-sm font-medium text-gray-800 dark:text-white">
                Area Markers
              </label>
            </div>
            {[1, 2, 3, 4, 5, 6].map((runValue) => (
              <div
                key={runValue}
                className="flex flex-row items-center gap-x-1"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={runsToShow.includes(runValue)}
                  onChange={() => {
                    if (runsToShow.includes(runValue)) {
                      setRunsToShow(
                        runsToShow.filter((run) => run !== runValue)
                      )
                    } else {
                      setRunsToShow([...runsToShow, runValue])
                    }
                  }}
                />
                <label className="text-sm font-medium text-gray-800 dark:text-white">
                  {runValue}&apos;s
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WagonWheel
