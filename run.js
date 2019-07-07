const rp = require("request-promise");
const fs = require('fs').promises;
const uuidv1 = require('uuid/v1');

const lastvideo = 18272;

function diff_minutes(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

async function download() {

  let url = 'https://elrellano.com/_ficheros/';
  let next = true;
  let i = 1;
  while (next) {
    if (i <= lastvideo) {
      console.log(`donwload video ${i}`)
      let initDate = new Date();
      await rp({
        url: url.concat(`items_${i}_mp4.mp4`),
        method: 'GET',
        encoding: null,
        headers: {
          'Content-type': 'video/mp4'
        }
      }).then((data) => {
        return fs.writeFile(`/home/williams/videos/rellano/items_${i}_mp4.mp4`, data, function (err) {
          console.log(err);
        });
      }).catch(function (err) {
        console.log(`catch error items_${i}_mp4.mp4`);
      });
      const diff = diff_minutes(new Date(), initDate);
      console.log(`duration ${diff}`)
      i++;
    } else {
      next = !next;
    }
  }
}

download();
