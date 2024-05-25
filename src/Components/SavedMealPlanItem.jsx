import React, { useEffect, useState } from "react";

export default function SavedMealPlanItem({ eachSave, deleteMealPlan }) {
  const [breakfastInfo, setBreakfastInfo] = useState(null);
  const [lunchInfo, setLunchInfo] = useState(null);
  const [dinnerInfo, setDinnerInfo] = useState(null);

  const getRecipeInfo = async (id, setInfo) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=54ddd5a828fa4d01bf9546fe1d854603`
      );
      const data = await response.json();
      setInfo(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching recipe info:", error);
    }
  };

  useEffect(() => {
    getRecipeInfo(eachSave.BreakfastID, setBreakfastInfo);
    getRecipeInfo(eachSave.LunchID, setLunchInfo);
    getRecipeInfo(eachSave.DinnerID, setDinnerInfo);
  }, [eachSave]);

  return (
    <div>
      <h2>{eachSave.Day}</h2>
      <p>
        Breakfast
        {breakfastInfo ? (
          <>
            <img
              src={breakfastInfo.image}
              alt={breakfastInfo.title}
              width="100"
            />
            {breakfastInfo.title}
          </>
        ) : (
          "Loading..."
        )}
      </p>
      <p>
        Lunch
        {lunchInfo ? (
          <>
            <img src={lunchInfo.image} alt={lunchInfo.title} width="100" />
            {lunchInfo.title}
          </>
        ) : (
          "Loading..."
        )}
      </p>
      <p>
        Dinner
        {dinnerInfo ? (
          <>
            <img src={dinnerInfo.image} alt={dinnerInfo.title} width="100" />
            {dinnerInfo.title}
          </>
        ) : (
          "Loading..."
        )}
      </p>
      <button>Edit Criteria</button>
      <button onClick={() => deleteMealPlan(eachSave.id)}>Delete</button>
    </div>
  );
}