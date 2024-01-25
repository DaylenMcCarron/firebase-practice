import { AddMovie } from "./components/addMovie"
import { MyProvider } from "./context";
import { Auth } from "./components/auth"
import { MovieList } from "./components/movieList"

const App = () => {

  return (
    <MyProvider>
      <Auth/>
      <hr />
      <AddMovie/>
      <hr/>
      <MovieList/>
    </MyProvider>
  )
}

export default App
