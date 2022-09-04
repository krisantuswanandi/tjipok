import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { pusher } from '../utils/pusher'

interface PusherResponse {
  message: string
}

const useResult = () => {
  const [result, setResult] = useState('empty result') 

  useEffect(() => {
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data: PusherResponse) => {
      setResult(JSON.stringify(data))
    })

    return () => {
      pusher.unsubscribe('my-channel')
    }
  }, [])

  return result
}

const Home: NextPage = () => {
  const result = useResult()

  return (
    <div>
      { result }
    </div>
  )
}

export default Home
