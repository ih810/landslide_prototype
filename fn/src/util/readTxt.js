export default function readTxt(path, viewPort) {
  return new Promise((resolve) => {
    console.log("load new txt", path, viewPort);
    var request = new XMLHttpRequest();
    request.open("GET", path, true);
    console.log("load txt");
    request.responseType = "blob";
    request.onload = function () {
      var reader = new FileReader();
      console.log("read txt");
      reader.readAsText(request.response);
      reader.onload = function (e) {
        console.log("txt res", e.target.result);
        resolve(e.target.result);
      };
    };
    request.send();
  });
}
