
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions,Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DogContext } from './DogContext';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const DogCard = () => {

    const {
        breedGroup,
        dogNum,
        favouriteList,
        selectedBreeds,
        handleFavouriteList
    } = useContext(DogContext);

    const navigate = useNavigate();



    return (
      <Card sx={{ maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <CardActionArea
          onClick={() =>
            navigate(
              `/dog-detail/${
                breedGroup === "All"
                  ? selectedBreeds[dogNum].id
                  : selectedBreeds[dogNum].id
              }`
            )
          }
        >
          <CardMedia
            component="img"
            sx={{
                height: 400,
                objectFit: 'fill',
                
              }}
            image={
              breedGroup === "All"
                ? selectedBreeds[dogNum].image.url
                : selectedBreeds[dogNum].image.url
            }
            alt={
              breedGroup === "All"
                ? selectedBreeds[dogNum].name
                : selectedBreeds[dogNum].name
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx= {{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {selectedBreeds[dogNum].name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton
            onClick={(e) =>
              handleFavouriteList(
                selectedBreeds[dogNum].id,
                !favouriteList.some(
                  (dog) => dog.id === selectedBreeds[dogNum].id
                )
              )
            }
            size="small"
            color={
              favouriteList.some((dog) => dog.id === selectedBreeds[dogNum].id)
                ? "secondary"
                : "default"
            }
          >
            {favouriteList.some(
              (dog) => dog.id === selectedBreeds[dogNum].id
            ) ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon style={{ color: "black" }} />
            )}
          </IconButton>
        </CardActions>
      </Card>
    );



}