import React, { useState, useEffect } from 'react'

export default function useMedia(media) {
  const [match, setMatch] = useState(null)

  useEffect(() => {

    function changeMatch(){
      const {matches} = window.matchMedia(media)

      setMatch(matches)
    }
    changeMatch()
    window.addEventListener('resize', changeMatch)

    return () => {
      window.removeEventListener('resize', changeMatch)
    }
  }, [media])


  return (
    match
  )
}
