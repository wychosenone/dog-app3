import { DogContext } from "./DogContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardMedia, Typography, Button ,IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const FavouritesList = () => {
    const {favouriteList,removeFromFavouriteList} = useContext(DogContext)
    const navigate = useNavigate();

    return (
      <div style={{ padding: '2rem' }}>
        <Button variant="outlined" onClick={()=> navigate(-1)}>Back</Button>
        <Typography variant="h4" style={{ marginBottom: '2rem', marginTop: '1rem' }}>Favourites:</Typography>
        <Grid container spacing={3}>
          {favouriteList.map((dog, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{"&:hover": { transform: "scale(1.05)" , transition:"linear"}}} onClick={() => navigate(`/dog-detail/${dog.id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  sx={{
                    objectFit:"fill"
                  }}
                  image={dog.image.url}
                  alt={dog.name}
                />
                <Typography variant="h6" align="center" style={{ padding: '1rem' }}>{dog.name}</Typography>
                <IconButton sx={{float:"right"}}onClick={(e) => {e.stopPropagation(); removeFromFavouriteList(dog.id);}}>
                <DeleteIcon />
            </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
};
