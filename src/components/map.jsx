import { useContext, useState } from "react"
import { MyContext } from "../context";


export const Map = () => {

    const context = useContext(MyContext)
    return (
        <div>
          <div id="map" ref={context.mapContainer} className="map-container" />
        </div>
      );
}