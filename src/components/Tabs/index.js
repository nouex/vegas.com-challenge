const Tabs = ({ content, tab, setTab }) => {
  return (
    <>
      <nav className="tabs">
        <div role="button" onClick={setTab.bind(null, "description")} className={`tab ${tab === "description" ? "active" : ""}`}>
          <span className="tab-txt pointer">Description</span>
        </div>
        <div role="button" onClick={setTab.bind(null, "details")} className={`tab ${tab === "details" ? "active" : ""}`}>
          <span className="tab-txt pointer">Details</span>
        </div>
        <div role="button" onClick={setTab.bind(null, "map")} className={`tab ${tab === "map" ? "active" : ""}`}>
          <span className="tab-txt pointer">Location</span>
        </div>
      </nav>
      <main>
        {content}
      </main>
    </>
  )
}

export default Tabs
