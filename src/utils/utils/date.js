export const filterDate = (originalDate) => {
  if (!originalDate) return "";
  const date = new Date(originalDate);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};
export const filterHours = (d)=>{
  if(d == 1) return "1小时";
  return `${ d / 24 }天`
}
