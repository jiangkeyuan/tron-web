export const createAPIKEY = (callback) => {
  ElMessageBox.prompt("", "请输入Key的名称，以便区分统计", {
    confirmButtonText: "创建KEY",
    showCancelButton: false,
    inputErrorMessage: "Invalid Email",
    beforeClose: (a, b, done) => {
      if (a === "confirm") {
        done();
      }
    },
  });
};
