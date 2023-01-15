import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const Form = () => {
  const [image, setImage] = useState(null);
  const [responce, setResponce] = useState(null);
  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    values: { file },
  } = useFormik({
    initialValues: {
      file: "",
    },
    onSubmit: async (value) => {
      try {
        const payload = {
          ...value,
          uploadDate: new Date(),
        };

        const formData = new FormData();
        formData.append("myFile", image);

        const data = await axios.post(
          `${process.env.REACT_APP_API_URL}file/upload`,
          formData
        );
        setResponce(data.data.data);
      } catch (err) {
        console.log("error", err);
      }
    },
  });

  return (
    <Card style={{ padding: "1rem" }}>
      {!responce ? (
        <form>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <input
                type="file"
                id="file"
                onChange={(e) => {
                  console.log("file", e.target.files[0]);
                  setImage(e.target.files[0]);
                  setFieldValue("file", e.target.files[0]);
                }}
              />
              {/* <TextField
              type="file"
              fullWidth
              label="File"
              id="File"
              value={file}
              onChange={(e) => console.log("file", e.target.value)}
              variant="outlined"
            /> */}
            </Grid>
            <Grid item md={12}>
              <Button onClick={handleSubmit} variant="contained">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <>
          <Stack>
            <Typography variant="h3">Share following detail</Typography>
            <Typography variant="subtitle1">
              Share:{" "}
              <NavLink to={`download/${responce?.id || ""}`}>{`${
                process.env.REACT_APP_API_URL
              }${responce?.id || ""}`}</NavLink>
            </Typography>
            <Button variant="contained" onClick={() => setResponce(null)}>
              Upload New
            </Button>
          </Stack>
        </>
      )}
    </Card>
  );
};

export default Form;
