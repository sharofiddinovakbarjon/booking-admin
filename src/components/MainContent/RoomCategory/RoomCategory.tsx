import React, { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const RoomCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const token = localStorage.getItem("token") + "";

  const getAllCategories = async () => {
    try {
      const cafeIDResponse = await axios.get(
        "https://cafe-booking.uz/api/v1/cafes/get-cafe/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (cafeIDResponse.status === 200) {
        const categoryResponse = await axios.get(
          `https://cafe-booking.uz/api/v1/cafes/${cafeIDResponse.data.id}/get-cafe-all-categories-rooms/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (categoryResponse.status === 200) {
          setCategories(categoryResponse.data.categories);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (inputValue) {
      try {
        const response = await axios.post(
          "https://cafe-booking.uz/api/v1/cafes/cafe/post-room-category/",
          { name: inputValue },
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          setInputValue("");
          getAllCategories();
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    setDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDiaogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    getAllCategories();
  }, [token]);

  return (
    <>
      <div className="room-category">
        <div className="content-inner">
          <div className="content-top">
            <input
              type="text"
              placeholder="your room category name"
              value={inputValue}
              onChange={handleInputChange}
              required
            />
            <button
              onClick={() => setDialogOpen(true)}
              className="addCategory_btn"
            >
              Add
            </button>
            <Dialog
              open={dialogOpen}
              onClose={handleDiaogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirmation Category"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDiaogClose} style={{ color: "crimson" }}>
                  No
                </Button>
                <Button onClick={handleSubmit} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="categories-list">
            {categories?.map((category, index) => (
              <div className="category-item" key={`${category}-${index}`}>
                <div className="left">
                  <span>{index + 1}.</span>
                  <p>{category.name}</p>
                  <p>Rooms: {category.rooms.length}</p>
                </div>
                <button className="deleteCategory_btn">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCategory;
