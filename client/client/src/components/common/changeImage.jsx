import { useState } from "react";
import httpService from "../../services/httpService";

const UploadImage = ({ url, formDataName, id }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelected = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUploadFile = async () => {
    const formData = new FormData();
    formData.append(formDataName, selectedFile);
    await httpService.put(`${url}/${id}`, formData);
    window.location.reload();
  };

  return (
    <div className="mb-4">
      <input name={formDataName} type="file" onChange={handleFileSelected} />
      <button
        className="mt-2"
        onClick={() => {
          handleUploadFile();
          window.location.reload();
        }}
      >
        Upload Image
      </button>
    </div>
  );
};

export default UploadImage;
