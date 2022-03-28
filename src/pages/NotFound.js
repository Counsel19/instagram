import React, { useEffect } from 'react'

const NotFound = () => {

    useEffect(() => {
        document.title = "Not Found!";
    }, [])
    
  return (
    <div className="bg-gret-background">
        <div className="mx-auto max-screen-lg">
            <p className="text-center text-2xl">Not Found</p>
        </div>
    </div>
  )
}

export default NotFound