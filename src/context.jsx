import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';

const AppContext = React.createContext();
// we get back 2 components

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'



// basically the whole point of using aync await is that the api might give information with a delay so we use this so that the page can load without waiting for api response.
const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if (favorites){
      favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else{
      favorites = []
    }
  return favorites;
}

const AppProvider = ({ children }) => {
  const [loading, setloading] = useState(false)
  const [meals, setMeals] = useState([])
  const [searchTerm, setsearchTerm] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

  // This is one way of fetching data from api.
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('https://randomuser.me/api/')
  //     const data = await response.json()
  //     console.log(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const fetchMeals = async (url) => {
    setloading(true);
    try {
      const { data } = await axios.get(url);
      // Here we pass url as parameter instead of hard coding to avoid writing the same thing multiple times.
      // here if you define a const as this it will take the data property of the object.
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }
    }
    catch (error) {
      console.log(error.response)
    }
    setloading(false);
  }

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  }

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal){
       meal = favorites.find((meal) => meal.idMeal === idMeal)
    }
    else{
      meal = meals.find((meal) => meal.idMeal === idMeal)
    }
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
  }

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
  }

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, [])
  //For first time load this

  useEffect(() => {
    if (!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])

  // useEffect(() => {
  //   fetchMeals(`${allMealsUrl}${searchTerm}`)
  // }, [searchTerm])
  //Here if we remove the dependency array then we will request api for information infintely while adding the dependency empty array,it will ask api for info only on the initial load.
  // So why is this infinite loop occuring.
  //Imp thing is whenever the useState value changes the page re-renders.
  //so when the page loads the callback function of useEffect triggers the useState function to change the value of meals and as meals value changes the page triggers re-render and so the whole process keeps on repeating.

  // So why does we use useEffect here and not call the fetchMeals directly.Because again it will change meals and the loop will again start.So useEffect helps in rendering the function only once.

  // Here children is a special prop representing everything we want in the code.children represents the entire application.
  return <AppContext.Provider value={{ meals, loading, setsearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites }} >
    {/* Here the value is the field where we will pass the prop */}
    {children}
  </AppContext.Provider>
}

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}



export { AppContext, AppProvider }