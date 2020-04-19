const renderTimestamp = timestamp => {
  let prefix = "";
  const timeDiff = Math.round(
    (new Date().getTime() - new Date(timestamp).getTime()) / 60000
  );
  if (timeDiff < 1) {
    prefix = "방금 전";
  } else if (timeDiff < 60 && timeDiff >= 1) {
    prefix = `${timeDiff}분 전`;
  } else if (timeDiff < 24 * 60 && timeDiff >= 60) {
    prefix = `${Math.round(timeDiff / 60)}시간 전`;
  } else if (timeDiff < 31 * 24 * 60 && timeDiff >= 24 * 60) {
    prefix = `${Math.round(timeDiff / (60 * 24))}일 전`;
  } else {
    prefix = `${new Date(timestamp)}`;
  }
  return prefix;
};
