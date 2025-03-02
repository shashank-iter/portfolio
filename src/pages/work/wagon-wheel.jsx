import React from 'react'
import WagonWheel from '@/components/WagonWheel'

function Work() {
  return (
    <>
      <div className=" mx-auto  max-w-6xl p-4">
        <div className="text-3xl font-semibold text-black dark:text-white my-10">
          Cricket Wagon Wheel
        </div>
        <div className="mx-auto flex w-full items-center justify-center">
          <WagonWheel />
        </div>
      </div>
    </>
  )
}

export default Work
