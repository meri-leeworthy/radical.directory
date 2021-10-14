const { client } = require("./s3-client");

var woff = {
  localFile: "fonts/viksjo/ViksjoeWeb-Regular.woff",

  s3Params: {
    Bucket: "rdstatic",
    Key: "private/fonts/ViksjoeWeb-Regular.woff",
    // other options supported by getObject
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
  },
};
var woff2 = {
  localFile: "fonts/viksjo/ViksjoeWeb-Regular.woff2",

  s3Params: {
    Bucket: "rdstatic",
    Key: "private/fonts/ViksjoeWeb-Regular.woff2",
    // other options supported by getObject
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
  },
};
var downloader = client.downloadFile(woff);

downloader.on("error", function (err) {
  console.error("unable to download:", err);
});
downloader.on("progress", function () {
  console.log("progress", downloader.progressAmount, downloader.progressTotal);
});
downloader.on("end", function () {
  console.log("done downloading");
});

var downloader2 = client.downloadFile(woff2);
downloader2.on("error", function (err) {
  console.error("unable to download:", err);
});
downloader2.on("progress", function () {
  console.log("progress", downloader.progressAmount, downloader.progressTotal);
});
downloader2.on("end", function () {
  console.log("done downloading");
});
