// There are some comments in Readme file.
import './App.css'
import Modal from './components/Modal';
import Favourites from './components/Favourites';
import Meals from './components/Meals';
import Search from './components/Search';
import { useGlobalContext } from "./context";

export default function App() {
  const { showModal, favorites } = useGlobalContext();

  return (
    <main>
      <Search />
      {favorites.length > 0 && <Favourites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  )
}
