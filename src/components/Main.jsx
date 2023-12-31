import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Main = () => {
  const initialInput = {
    title: '',
  };
  const [postsList, setPostsList] = useState([]);
  const [formData, setFormData] = useState(initialInput);
  const [editingPost, setEditingPost] = useState('');

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPostsList(JSON.parse(savedPosts));
    }
  }, []);

  const updateFormData = (newValue, inputField) => {
    setFormData((prevData) => ({ ...prevData, [inputField]: newValue }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.title) {
      const newPost = {
        id: crypto.randomUUID(),
        title: formData.title,
      };

      setPostsList((prevPostsList) => {
        const newPostsList = [...prevPostsList, newPost];
        localStorage.setItem('posts', JSON.stringify(newPostsList));
        return newPostsList;
      });

      setFormData(initialInput);
    }
  };

  const handleFormReset = (e) => {
    setEditingPost('');
    setFormData(initialInput);
  };

  const deletePost = (deleteId) => {
    setPostsList((prevPostsList) => {
      const updatedPosts = prevPostsList.filter((post) => post.id !== deleteId);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

  const editPost = (idToEdit) => {
    const post = postsList.find((post) => post.id === idToEdit);

    if (!post) {
      return;
    }

    setEditingPost(idToEdit);

    setFormData({
      title: post.title,
    });
  };

  const updatePost = () => {
    const updatedPostsList = postsList.map((post) =>
      post.id === editingPost ? { ...post, title: formData.title } : post,
    );

    setPostsList(updatedPostsList);
    localStorage.setItem('posts', JSON.stringify(updatedPostsList));
    setEditingPost('');
    setFormData(initialInput);
  };

  const isEditing = editingPost !== '';

  return (
    <div>
      <main className="min-h-screen bg-gray-300 py-20">
        <div className="container mx-auto w-1/2 rounded-lg border-4 border-green-600 bg-green-300 p-7">
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
            <div className="mt-5 flex gap-6">
              {isEditing ? (
                <>
                  <button
                    className="rounded-lg border-2 bg-blue-400 px-4 py-3 hover:bg-blue-600"
                    onClick={updatePost}
                  >
                    Update
                  </button>
                  <button
                    className="rounded-lg border-2 bg-gray-400 px-4 py-3 hover:bg-gray-600"
                    onClick={handleFormReset}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </form>

          {/* Posts List Outcome */}
          <div className="mt-5">
            <ul>
              {postsList.map((post) => (
                <li
                  key={post.id}
                  className="flex w-full justify-between border-b-2 border-gray-900 px-2 py-4 text-2xl font-bold"
                >
                  {isEditing && editingPost === post.id ? (
                    <TextInput
                      name="title"
                      placeholder="Titolo del Post"
                      value={formData.title}
                      onValueChange={(newValue) =>
                        updateFormData(newValue, 'title')
                      }
                    />
                  ) : (
                    post.title
                  )}
                  <div className="flex gap-2">
                    {!isEditing || editingPost !== post.id ? (
                      <button className="duration-150 hover:scale-125">
                        <EditIcon
                          fontSize="large"
                          className="text-blue-500"
                          onClick={() => editPost(post.id)}
                        />
                      </button>
                    ) : null}
                    <button className="duration-150 hover:scale-125">
                      <DeleteIcon
                        fontSize="large"
                        className="text-red-500"
                        onClick={() => deletePost(post.id)}
                      />
                    </button>
                  </div>
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
