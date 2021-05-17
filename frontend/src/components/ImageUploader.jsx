// NPM Packages
import axios from "axios";
import { useState, useEffect } from "react";
import ReactImageUploadComponent from "react-images-upload";

export const ImageUploader = ({ setImageState }) => {
  const [payload, setPayload] = useState(null);

  const updateImage = (event) => {
    var file = event[0];
    var data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "legalAliens-groups");
    setPayload(data);
  };

  useEffect(() => {
    const abortFetch = new AbortController();
    const sendImage = async () => {
      try {
        if (payload !== null) {
          const response = await axios.post(
            //Cloud link to upload the image to
            "https://api.cloudinary.com/v1_1/dlvwrtpzq/image/upload",
            payload
          );

          setImageState(response.data.secure_url);
        }
      } catch (error) {
        console.log(error);
      }
    };
    sendImage();
    return () => abortFetch.abort();
  }, [payload]);

  return (
    //image uploader handler
    <ReactImageUploadComponent
      singleImage={true}
      onChange={updateImage}
      buttonText="Upload Image"
      withLabel={false}
      withIcon={false}
      buttonClassName="upload-button"
      name="avatar"
      //TODO styles can be added here
    />
  );
};
