import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fileDownload from "js-file-download";

const DownloadPage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const onFileDownload = async () => {
    try {
      const responce = axios.get(
        `${process.env.REACT_APP_API_URL}file/${id}/download`,
        {
          responseType: "blob",
        }
      );
      fileDownload(responce.data, data?.fileName || "file");
    } catch (error) {
      console.log("error", error);
    }
  };

  const getData = async () => {
    try {
      const responce = await axios.get(
        `${process.env.REACT_APP_API_URL}file/${id}`
      );
      setData(responce.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    id && getData();
  }, [id]);

  return (
    <Card>
      {data && (
        <>
          <Typography variant="h4">Download File</Typography>
          <Box>
            <Typography variant="subtitle1">
              File Name: {data?.fileName}
            </Typography>
            <Button variant="outlined" onClick={onFileDownload}>
              Download
            </Button>
          </Box>
        </>
      )}
      {!data && "No Data Found"}
    </Card>
  );
};

export default DownloadPage;
