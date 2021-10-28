export const newReducer = (state = null, action) => {
  switch (action.type) {
    case "CREATE_NEW":
      return action.payload;
    case "MODIFY_NEW":
      return action.payload;
    case "DELETE_NEW":
      return action.payload;
    case "GET_ALL_NEWS":
      return action.payload;
    default:
      return state;
  }
};