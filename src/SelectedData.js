import React from 'react'

export const SelectedData = ({ countryDetails }) => {
  return (
    <div >
      {countryDetails ? (
        <div>
          <h1 style={{ marginTop: '100', padding: '0' }}>{countryDetails.name.common}</h1>
          <img src={countryDetails.flags.png} className='img' />
          <div className='text-start mx-4 mt-3'>
            <p><strong>Capital:</strong> {countryDetails.capital}</p>
            <p><strong>Population:</strong> {countryDetails.population}</p>
            <p><strong>Area:</strong> {countryDetails.area} sq km</p>
            <p><strong>Languages:</strong> {Object.values(countryDetails.languages).join(', ')}</p>
            <p><strong>Currency:</strong> {Object.keys(countryDetails.currencies).join(', ')}</p>
          </div >
        </div>
      ):<h1>Search by Name or select in Map </h1>}
    </div>
  )
}
