import { AddMovie } from "./components/addMovie"
import { MyProvider } from "./context";
import { Auth } from "./components/auth"
import { MovieList } from "./components/movieList"
import { Map } from "./components/map";

const App = () => {

  return (
    <MyProvider>
      <Map />
      <hr />
      <Auth/>
      <hr />
      <AddMovie/>
      <hr/>
      <MovieList/>
    </MyProvider>
  )
}

export default App
