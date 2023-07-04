import { useEffect, useState, createContext } from "react";
// import { useNavigate } from "react-router-dom";

export const DogContext = createContext();

export default function DogProvider({ children }) {
  const [breeds, setBreeds] = useState([]);
  const [dogNum, setDogNum] = useState(0);
  const [breedGroup, setBreedGroup] = useState("All");
  const [errorMessage, setErrorMessage] = useState("");
  const [favouriteList, setFavouriteList] = useState(
    JSON.parse(localStorage.getItem("favouriteList")) || []
  );

  const handleFavouriteList = (id, checked) => {
    if (checked) {
      const newFavourites = [...favouriteList, breeds[dogNum]];
      setFavouriteList(newFavourites);
      localStorage.setItem("favouriteList", JSON.stringify(newFavourites));
    } else {
      const newFavourites = favouriteList.filter((dog) => dog.id !== id);
      setFavouriteList(newFavourites);
      localStorage.setItem("favouriteList", JSON.stringify(newFavourites));
    }
  };

  const removeFromFavouriteList = (id) => {
    const newFavourites = favouriteList.filter((dog) => dog.id !== id);
    setFavouriteList(newFavourites);
    localStorage.setItem("favouriteList", JSON.stringify(newFavourites));
  };


  useEffect(() => {
    console.log(favouriteList)
  },[favouriteList]);

  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds", {
      headers: {
        "x-api-key":
          "live_Ins7nWvUBUqyaiU8bFdV4RIodEyCOPxOqPUWPWlo1vU7mPR1XYi4r95gywbKf4ZO",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setBreeds(
          data.map((item) => {
            return item.breed_group
              ? { ...item }
              : { ...item, breed_group: "unspecified" };
          })
        )
      )
      .catch((error) => setErrorMessage(error.message));
  }, []);

  //set to solve repeat
  const distinctBreeds = Array.from(
    new Set(breeds.map((breed) => breed.breed_group))
  );
  const selectedBreeds =
    breedGroup === "All"
      ? breeds
      : breeds.filter((breed) => breed.breed_group === breedGroup);

  useEffect(() => {
    setDogNum(0);
  }, [breedGroup, setDogNum]);

useEffect(()=> {
    console.log(breeds);
},[breeds])

  return (
    <DogContext.Provider
      value={{
        breeds,
        setDogNum,
        dogNum,
        breedGroup,
        setBreedGroup,
        errorMessage,
        favouriteList,
        handleFavouriteList,
        distinctBreeds,
        selectedBreeds,
        removeFromFavouriteList
      }}
    >
      {children}
    </DogContext.Provider>
  );
}
