async function mergeSort(arr, stats) {
  const start = performance.now();
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = await mergeSort(arr.slice(0, mid), stats);
  const right = await mergeSort(arr.slice(mid), stats);
  const result = await merge(left, right);
  stats.mergeSort = performance.now() - start;
  return result;
}

async function merge(left, right) {
  let i = 0,
    j = 0,
    result = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

async function quickSort(arr, stats) {
  const start = performance.now();
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  const result = (await quickSort(left, stats)).concat(
    pivot,
    await quickSort(right, stats)
  );
  stats.quickSort = performance.now() - start;
  return result;
}

async function insertionSort(arr, stats) {
  const start = performance.now();
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  stats.insertionSort = performance.now() - start;
  return arr;
}

async function sort(arr) {
  const stats = {};
  const [mergeSorted, quickSorted, insertionSorted] = await Promise.all([
    mergeSort(arr.slice(), stats),
    quickSort(arr.slice(), stats),
    insertionSort(arr.slice(), stats),
  ]);
  console.log("Merge Sort:", mergeSorted);
  console.log("Quick Sort:", quickSorted);
  console.log("Insertion Sort:", insertionSorted);
  console.log("Stats:", stats);
}

const arr = Array.from({ length: 40000 }, () => Math.floor(Math.random() * 1000) + 1);
sort(arr);
