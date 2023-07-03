import "./index.css";
import { useState, useEffect } from "react";

const FavouritesList = ({ favouriteList }) => {
  return (
    <div className="favourites-container">
      <h2>Favourites</h2>
      {favouriteList.map((dog, index) => (
        <div key={index} className="favourite-item">
          <img src={dog.image.url} alt={dog.name} />
          <span>{dog.name}</span>
        </div>
      ))}
    </div>
  );
};

const DogGallery = ({
  breeds,
  setDogNum,
  breedGroup,
  dogNum,
  setBreedGroup,
  favouriteList,
  distinctBreeds,
  selectedBreeds,
  handleFavouriteList
}) => {
  return (
    <div className="container">
      {selectedBreeds && selectedBreeds[dogNum] ? (
        <div className="dog">
          <h2>Dog Gallery</h2>
          <div className="filter">
            <span>filter by breed: </span>
            <select onChange={(e) => setBreedGroup(e.target.value)}>
              <option key="All">All</option>
              {distinctBreeds.map((breed, index) => (
                <option key={index}>{breed}</option>
              ))}
            </select>
          </div>

          {breedGroup === "All" ? (
            <img
              className="dogIMG"
              src={breeds[dogNum].image.url}
              alt={breeds[dogNum].name}
            />
          ) : (
            <img
              className="dogIMG"
              src={selectedBreeds[dogNum].image.url}
              alt={selectedBreeds[dogNum].name}
            />
          )}
          <span>{selectedBreeds[dogNum].name}</span>
          <div className="buttons">
            <button
              onClick={() =>
                dogNum === 0 ? setDogNum(0) : setDogNum((prev) => prev - 1)
              }
            >
              Last
            </button>
            {dogNum + 1}/{selectedBreeds.length}
            <button
              onClick={() =>
                dogNum === selectedBreeds.length - 1
                  ? setDogNum(selectedBreeds.length - 1)
                  : setDogNum((prev) => prev + 1)
              }
            >
              Next
            </button>
            <div>
              <span>Like</span>
              <input
                type="checkbox"
                id="checkbox"
                checked={favouriteList.some(
                  (dog) => dog.id === selectedBreeds[dogNum].id
                )}
                onChange={(e) =>
                  handleFavouriteList(
                    selectedBreeds[dogNum].id,
                    e.target.checked
                  )
                }
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default function App() {
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

  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds", {
      headers: {
        "x-api-key":
          "live_Ins7nWvUBUqyaiU8bFdV4RIodEyCOPxOqPUWPWlo1vU7mPR1XYi4r95gywbKf4ZO"
      }
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

  return (
    <div className="App">
      <DogGallery
        breeds={breeds}
        setDogNum={setDogNum}
        dogNum={dogNum}
        breedGroup={breedGroup}
        setBreedGroup={setBreedGroup}
        errorMessage={errorMessage}
        favouriteList={favouriteList}
        handleFavouriteList={handleFavouriteList}
        distinctBreeds={distinctBreeds}
        selectedBreeds={selectedBreeds}
      />
      <FavouritesList favouriteList={favouriteList} />
    </div>
  );
}
