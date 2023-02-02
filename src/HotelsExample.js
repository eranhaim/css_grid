import React, { useState, useEffect } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { Save } from "@material-ui/icons";

export default function HotelsExample() {
  const [hotels, setHotels] = useState([
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
    {
      Name: "Hotel Bracha",
      Location: "Nesher, Hatzafon",
      NumStars: 4,
      Owner: "Nissim Hamelech",
      isEdited: false,
    },
  ]);

  const fields = [
    { fieldName: "Name", displayName: "שם" },
    { fieldName: "Location", displayName: "מיקום" },
    { fieldName: "NumStars", displayName: "מספר כוכבים" },
    { fieldName: "Owner", displayName: "בעלים", input: <input/> },
  ];

  const updateItemInDB = (hotel, hotelIndex) => {
    fetch(`http://bla.bla/${hotel.ID}`, { methdo: "POST", body: { hotel } });
    let newHotels = [...hotels];
    newHotels[hotelIndex].isEdited = false;
    setHotels(newHotels)
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 0.3fr",
          minWidth: 800,
          width: "50%",
          margin: "20px auto",
          border: "1px solid black",
          gap: 5,
          padding: 5,
        }}
      >
        {fields.map((field) => (
          <div className="grid-title">{field.displayName}</div>
        ))}
        <div>{/* placeholder for saving */}</div>
        {hotels.map((hotel, hotelIndex) => (
          <>
            {fields.map((field) => (
              <TextField
                variant="outlined"
                value={hotel[field.fieldName]}
                onChange={({ target }) => {
                  let newHotels = [...hotels];
                  newHotels[hotelIndex][field.fieldName] = target.value;
                  newHotels[hotelIndex].isEdited = true;
                  setHotels(newHotels);
                }}
              />
            ))}
            <div>
              {hotel.isEdited && (
                <IconButton onClick={() => updateItemInDB(hotel, hotelIndex)}>
                  <Save />
                </IconButton>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
