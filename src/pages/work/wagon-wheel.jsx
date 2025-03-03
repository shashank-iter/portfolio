import React from 'react'
import WagonWheel from '@/components/WagonWheel'
import { Toaster } from 'react-hot-toast'

function Work() {
  const [radius, setRadius] = React.useState(150)
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
