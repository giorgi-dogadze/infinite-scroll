import React from 'react'

function New({user}) {
  console.log(user.company)
  console.log(user.company.name)
  return (
    <div>new</div>
  )
}

export default New