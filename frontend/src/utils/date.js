import React from 'react'

export const date = (dateToString) => {

    const date= new Date(dateToString);
    if(isNaN(date.getTime())){
        return "Invalid Date"
    }

  return date.toLocaleString("en-US", {
            year:"numeric",
            month:"long",
            day:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:true 
          })
}

export default date;
