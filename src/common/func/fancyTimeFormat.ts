export default function fancyTimeFormat(duration: number) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

export function secondsToHms(d: number) {
  const dd = Number(d);
  const h = Math.floor(dd / 3600);
  const m = Math.floor((dd % 3600) / 60);
  const s = Math.floor((dd % 3600) % 60);

  const hDisplay = h > 0 ? h + " giờ " : "";
  const mDisplay = m > 0 ? m + " phút " : "";
  const sDisplay = s > 0 ? s + " giây " : "";
  return hDisplay + mDisplay + sDisplay;
}

export function convertSecondsToHMS(seconds: number) {
  var days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * 24 * 60 * 60;
  var hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  var result = "";
  if (days > 0) {
    result += days + " ngày";
  } else {
    var decimalHours = (hours + minutes / 60 + seconds / 3600).toFixed(1);
    result += decimalHours + " giờ";
  }
  return result;
}
