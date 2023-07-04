import { DogContext } from "./DogContext";
import { useContext } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DogCard } from "./DogCard";
import Pagination from '@mui/material/Pagination';


export const DogGallery = () => {
    const {
        setDogNum,
        breedGroup,
        dogNum,
        setBreedGroup,
        distinctBreeds,
        selectedBreeds,
    } = useContext(DogContext);
    const handleChange = (event, value) => {
        setDogNum(value - 1);
      };
    


    return (
      <div >
        {selectedBreeds && selectedBreeds[dogNum] ? (
          <div className="container">
            <h2>Dog Gallery</h2>
            <div className="filter">
              <span>filter by breed: </span>
              <FormControl>
                <InputLabel id="breed-select-label">Breed</InputLabel>
                <Select
                  labelId="breed-select-label"
                  id="breed-select"
                  value={breedGroup}
                  size="small"
              style={{
                marginRight: "8px",
                width: "100px",
                height: "30px",
                paddingRight: "10px",
              }}
                  onChange={(e) => setBreedGroup(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  {distinctBreeds.map((breed, index) => (
                    <MenuItem key={index} value={breed}>
                      {breed}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <DogCard />
            <Pagination
              count={selectedBreeds.length}
              page={dogNum + 1}
              onChange={handleChange}
              color="secondary"
              shape="rounded"
              size="large"
            />
          </div>
        ) : null}
      </div>
    );
};
