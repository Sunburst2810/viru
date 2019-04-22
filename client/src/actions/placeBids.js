import axios from "axios";
import { GET_BIDS, CLEAR_CURRENT_BIDS } from "./types";

// Place Bids
export const placeBids = (bidsData, history) => dispatch => {
  axios
    .post("/api/bids", bidsData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_BIDS,
        payload: err.response.data
      })
    );
};
// Clear bids
export const clearCurrentBids = () => {
  return {
    type: CLEAR_CURRENT_BIDS
  };
};
