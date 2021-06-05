export const initialState = {
  user: null,
  detail: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return {
        user: action.payload,
      };
    case "DETAIL":
      return {
        detail: action.payload,
      };
    case "SIGNOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};
export default reducer;
