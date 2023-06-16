const changeDate = (postDate: string) => {
  const date = new Date(postDate);
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();

  if (timeDiff < 60 * 60 * 1000) return `${Math.floor(timeDiff / (60 * 1000))}분 전`;
  else if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
    return `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  else
    return `${date.getFullYear().toString().slice(-2)}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

export default changeDate;
