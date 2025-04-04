import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddForm from "../components/AddForm";
import HotelList from "../components/HotelList";

function PlacesPage() {
  const { action } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto p-4"> 
      {action !== "new" && (
        <div className="text-center my-4">
      
          <div className="mt-8">
            
          </div>
        </div>
      )}

      {action === "new" && (
        <div className="w-full">
          <AddForm />
        </div>
      )}
    </div>
  );
}

export default PlacesPage;
