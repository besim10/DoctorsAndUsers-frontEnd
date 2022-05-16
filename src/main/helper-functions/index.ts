export const todayDate = () => {
  let today = new Date();
  let dd = String(today.getDate() + 1).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  const date = yyyy + "-" + mm + "-" + dd;
  return date;
};
