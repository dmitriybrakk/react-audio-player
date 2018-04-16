const format2Number = (num) => {
  const str = `${num}`;
  if (str.length === 1) {
    return `0${str}`;
  }
  if (str.length === 0) {
    return '00';
  }
  return str;
};

export const formatTime = (s) => {
  if (!s && s !== 0) {
    return '??:??';
  }

  const totalSeconds = Math.floor(s);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) - hours * 60;
  const seconds = totalSeconds - minutes * 60 - hours * 3600;

  if (hours) {
    return `${hours}:${format2Number(minutes)}:${format2Number(seconds)}`;
  }

  return `${format2Number(minutes)}:${format2Number(seconds)}`;
};

export const offsetLeft = (el) => {
  let left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
};
