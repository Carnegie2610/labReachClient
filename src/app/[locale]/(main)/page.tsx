import Image from 'next/image'
import React from 'react'
const page = () => {
  return (
    <div>
        <h1>hello this is the main page</h1>
        <Image
        src="/images/lab/blinkLED.png"
        alt="Blink LED"
        width={400}
        height={300}
      />
        <div>hello this is the main page</div></div>
  )
}

export default page