import React from 'react'
import WagonWheel from '@/components/WagonWheel'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import useScreenWidth from '@/hooks/useScreenWidth'

function Work() {
  const screenWidth = useScreenWidth()
  useEffect(() => {
    if (screenWidth < 600) {
      setRadius(150)
    }
    if (screenWidth > 600) {
      setRadius(250)
    }
  }, [screenWidth])

  const [radius, setRadius] = React.useState(screenWidth < 600 ? 150 : 250)

  return (
    <>
      <Toaster />
      <div className=" mx-auto  max-w-6xl p-4">
        <div className="my-10 text-3xl font-semibold text-black dark:text-white">
          Cricket Wagon Wheel
        </div>
        <div className="mx-auto flex w-full items-center justify-center">
          <WagonWheel radius={radius} setRadius={setRadius} />
        </div>
      </div>
    </>
  )
}

export default Work
