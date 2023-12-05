import React, { useState } from 'react';
import TextInput from './TextInput';
import DeleteIcon from '@mui/icons-material/Delete';

const Main = () => {
  const initialInput = {
    title: '',
  };
  const [postsList, setPostsList] = useState([]);
  const [formData, setFormData] = useState(initialInput);

  const updateFormData = (newValue, inputField) => {
    const newFormData = { ...formData };

    newFormData[inputField] = newValue;

    setFormData(newFormData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.title) {
      const newPost = {
        id: crypto.randomUUID(),
        title: formData.title,
      };

      setPostsList([...postsList, newPost]);

      setFormData(initialInput);
    }
  };

  const handleFormReset = (e) => {
    setFormData(initialInput);
  };

  const deletePost = (deleteId) => {
    setPostsList(postsList.filter((post) => post.id !== deleteId));
  };

  return (
    <div>
      <main className="min-h-screen bg-gray-300 py-20">
        <div className="container mx-auto rounded-lg border-4 border-green-600 bg-green-300 p-7">
          {/* Form Body */}
          <form
            className=""
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
          >
            <TextInput
              name="title"
              placeholder="Titolo del Post"
              value={formData.title}
              onValueChange={(newValue) => updateFormData(newValue, 'title')}
            ></TextInput>

            {/* Form Buttons */}
            <div className="flex gap-6">
              <button
                className="rounded-lg border-2 bg-green-400 px-4 py-3 hover:bg-green-600"
                type="submit"
              >
                Salva
              </button>

              <button
                className="rounded-lg border-2 bg-red-400 px-4 py-3 hover:bg-red-600"
                type="reset"
              >
                Annulla
              </button>
            </div>
          </form>

          {/* Posts List Outcome */}
          <div className="mt-5">
            <ul>
              {postsList.map((post) => (
                <li key={post.id} className="flex w-full justify-between py-4">
                  {post.title}
                  <button onClick={() => deletePost(post.id)}>
                    <DeleteIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
