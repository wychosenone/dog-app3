import React, { useEffect, useState, useContext } from "react";
import { DogContext } from "./DogContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

export const DogDetail = () => {
  const { breeds } = useContext(DogContext);
  const { id } = useParams();
  const [dogDetail, setDogDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const breedDetail = breeds.find((breed) => breed.id === Number(id));
    setDogDetail(breedDetail);
  }, [breeds, id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!dogDetail) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleBack}
        style={{ marginTop: "20px", marginLeft: "30px", float: "left" }}
      >
        Back
      </Button>

      {dogDetail && (
        <Paper variant="outlined" style={{ padding: "20px", margin: "20px" }}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} sm={4}>
              <img
                src={dogDetail.image.url}
                alt={dogDetail.name}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Typography variant="h4" component="h2" gutterBottom>
                <b>Name: </b>{dogDetail.name}
              </Typography>

              <Box sx={{ my: 2, borderBottom: 1, borderColor: "divider" }}>
                <Typography variant="body1" component="p" gutterBottom>
                  <b>Breed for: </b>{dogDetail.bred_for? dogDetail.bred_for : "none"}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                  <b>Breed group: </b>{dogDetail.breed_group? dogDetail.breed_group : "none"}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                  <b>Height: </b>Imperial: {dogDetail.height.imperial? dogDetail.height.imperial : "none"}, Metric: {dogDetail.height.metric? dogDetail.height.metric : "none" }
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                  <b>Origin: </b>{dogDetail.origin ? dogDetail.origin : "none"}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                <b>Temperament: </b> {dogDetail.temperament? dogDetail.temperament : "none"}
                </Typography>
              </Box>

              <Typography variant="body1" component="p" gutterBottom>
              <b>Overview: </b>
                {dogDetail.description ? dogDetail.description : "none"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
};
