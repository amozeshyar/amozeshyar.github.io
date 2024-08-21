export const calculateHalandTest = (ansArray) => {
  const newArray = [...ansArray];
  const sortedAns = newArray.sort((a, b) => {
    return +a.id - +b.id;
  });
  const results = [
    {
      point: 0,
      num: 1,
      name: 'قاعده‌مند و قراردادی',
      color: '#A89ADF',
    },
    {
      point: 0,
      num: 2,
      name: 'جستجوگر',
      color: '#22CBFF',
    },
    {
      point: 0,
      num: 3,
      name: 'هنری',
      color: '#FCC22F',
    },
    {
      point: 0,
      num: 3,
      name: 'اجتماعی',
      color: '#2DDAB0',
    },
    {
      num: 4,
      point: 0,
      name: 'مدیر و جسور',
      color: '#20D050',
    },
    {
      num: 5,
      point: 0,
      name: 'عمل‌گرا',
      color: '#717171',
    },
  ];

  sortedAns.forEach((ans) => {
    switch (ans.id % 6) {
      case 1:
        results[0].point += ans.point;
        break;
      case 2:
        results[1].point += ans.point;
        break;
      case 3:
        results[2].point += ans.point;
        break;
      case 4:
        results[3].point += ans.point;
        break;
      case 5:
        results[4].point += ans.point;
        break;
      case 0:
        results[5].point += ans.point;
        break;
    }
  });

  return results
    .map((item) => item.point)
    .join(',');
};
