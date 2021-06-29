import { useState, createElement } from "react"

import Description from "./Tabs/Description"
import Details from "./Tabs/Details"
import Map from "./Tabs/Map"
import Header from "./Header"
import Tabs from "./Tabs/index"

const tabComponent = {
  "description": Description,
  "details": Details,
  "map": Map
}

const Content = ({ hotelData }) => {
  const [tab, setTab] = useState("description")
  if (!hotelData) return null
  const content = createElement(tabComponent[tab], { hotelData })

  return (
    <div className="content">
      <Header hotelData={hotelData} setTab={setTab} />
      <Tabs hotelData={hotelData} content={content} tab={tab} setTab={setTab} />
    </div>
  )
}

export default Content
