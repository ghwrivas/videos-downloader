const rp = require("request-promise");
const fs = require('fs').promises;
const uuidv1 = require('uuid/v1');

const lastvideo = 17034;

function diff_minutes(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

async function download() {

  let url = 'https://elrellano.com/_ficheros/';
  let next = true;
  let i = lastvideo;
  let downloads = [];
  while (next) {
    if (i > 0) {
      let initDate = new Date();
      let filename = `items_${i}_mp4.mp4`;
      let promise = rp({
        url: url.concat(filename),
        method: 'GET',
        encoding: null,
        headers: {
          'Content-type': 'video/mp4'
        }
      }).then((data) => {
        return fs.writeFile(`/home/williams/videos/rellano/${filename}`, data, function (err) {
          console.log(err);
        });
      }).catch(function (err) {
        return Promise.resolve({
          error: filename
        });
      });
      downloads.push(promise);
      const diff = diff_minutes(new Date(), initDate);
    } else {
      next = !next;
    }
    i--;
  }
  Promise.all(downloads).then(values => {
    for (let j = 0; j <= values.length; j++) {
      console.log(values[j])
    }
  });
}

download();
