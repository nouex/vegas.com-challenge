import { useState } from "react"

const Description = ({ hotelData }) => {
  const [showAll, setShowAll] = useState(false)

  if (!hotelData) return "Loading"

  const showAllTxt = showAll ? "HIDE FULL DESCRIPTION" : "SHOW FULL DESCRIPTION"
  const iconClass = showAll ? "icon-up" : "icon-down"
  const toggleShowAll = () => setShowAll(!showAll)

  return (
    <div className="description tab-content">
      {
        hotelData.description.split("\r\n\r\n")
          .slice(0, showAll ? undefined : 2 )
          .map((p, i) => <p key={i}>{p}</p>)
      }
      <div onClick={toggleShowAll} className="pointer purple-txt">
        {showAllTxt}
        <span className={iconClass}></span>
      </div>
    </div>
  )
}

export default Description
