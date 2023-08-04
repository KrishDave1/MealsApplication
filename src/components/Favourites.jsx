import { useGlobalContext } from "../context";

const Favourites = () => {
  const { favorites , selectMeal ,removeFromFavorites } = useGlobalContext();
  //Here we took selectMeal bcoz we can click on the favorites to see its modal
  return (
    <section className="favorites">
      <div className= "favorites-content">
        <h5>Favourites</h5>
        <div className = "favorites-container">
          {favorites.map((item) => {
          const {idMeal,strMealThumb:image} = item;
      return <div key = {idMeal} className = "favorite-item">
        <img src={image} className="favorites-img img" onClick={() => selectMeal(idMeal,true)}/>
        <button className = "remove-btn" onClick={() => removeFromFavorites(idMeal)}>
        remove
        </button>
      </div>
          })}
      </div>
      </div>
    </section>
  )
}

export default Favourites;