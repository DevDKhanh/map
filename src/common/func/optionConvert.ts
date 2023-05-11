export function removeVietnameseTones(str: string): string {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

export function displayNumber(num: number) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num.toString();
  }
}

export function dataURLtoBlob(dataURL: string) {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return blob;
}

export function getTextTime(value: { h: number; m: number }) {
  return `${value?.h <= 0 ? "" : `${value?.h} giờ`} ${
    value?.m <= 0 ? "" : `${value?.m} phút`
  }`;
}

function checkTime(i: any) {
  if (Math.abs(i) < 10) {
    i = "0" + i;
  }
  return i;
}

export const timeSubmit = (date: Date | null) => {
  return date
    ? `${date.getFullYear()}-${checkTime(date.getMonth() + 1)}-${checkTime(
        date.getDate()
      )}T00:00`
    : null;
};

export const getValueArr = (key: string, arr: any[], valueDefault: any) => {
  try {
    return arr.length > 0 ? arr.map((v) => v[key]) : valueDefault;
  } catch (err) {
    return valueDefault;
  }
};

export const jsonParse = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

export function combineItems({ arr = [], key = "uuid" }: any) {
  let result = [];
  for (let obj of arr) {
    result.push(...obj?.items);
  }

  const newArr = result.filter(
    (el: any, index: any, self: any) =>
      index === self.findIndex((t: any) => t[key] === el[key])
  );

  return newArr;
}

export function getCurrentWeekNumber(startDate: string, date: Date) {
  var startOfWeek = new Date(
    parseInt(startDate.slice(6)), // Năm
    parseInt(startDate.slice(3, 5)) - 1, // Tháng (đánh số từ 0 đến 11)
    parseInt(startDate.slice(0, 2)) // Ngày
  );

  // Ngày hiện tại
  const start = new Date(startOfWeek);
  const currentDate = new Date(date);

  // Tính số milliseconds từ ngày đầu tiên của tuần 1 đến ngày hiện tại
  const millisecondsDiff = currentDate.getTime() - start.getTime();

  // Chuyển đổi milliseconds thành số tuần
  const weekNumber =
    Math.floor(millisecondsDiff / (1000 * 60 * 60 * 24 * 7)) + 1;

  return millisecondsDiff >= 0 ? `Tuần ${weekNumber ? weekNumber : 1}: ` : "";
}

// Ngày bắt đầu tuần (16/01/2023)
