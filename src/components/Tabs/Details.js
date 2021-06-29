import { useState } from "react"

const Details = ({ hotelData }) => {
  const [showAll, setShowAll] = useState(false)

  if (!hotelData) return "Loading"

  const showAllTxt = showAll ? "VIEW FEWER DETAILS" : "VIEW MORE DETAILS"
  const iconClass = showAll ? "icon-up" : "icon-down"
  const toggleShowAll = () => setShowAll(!showAll)


  return (
    <div className="tab-content">
      {
        hotelData.details
          .slice(0, showAll ? undefined : 2)
          .map(({label, value}) => (
          <div key={label} className="detail">
            <div className="bold">{label}:</div>
            <div>{value}</div>
          </div>
        ))
      }
      <div onClick={toggleShowAll} className="pointer purple-txt">
        {showAllTxt}
        <span className={iconClass}></span>
      </div>
    </div>
  )
}

export default Details
