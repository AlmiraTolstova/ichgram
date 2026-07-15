import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/userProfileSlice";
import AppButton from "../../components/appButton";

export default function CreatePost() {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createPost({
        description,
        image,
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Создать пост</button>
    </form>
  );
}
