/**
 * Peak finding:
 * In an array/arrays of numbers can be just one peak.
 * */



/** Find 1D Peak */

// Straightforward algorithm. O(n)
function find1DPeak1(arr: number[]): number {
    for (let i = 0; i < arr.length; i++) {
        if (i !== 0 && i !== arr.length && (arr[i] > arr[i - 1] && arr[i] > arr[i + 1])) {
            return arr[i];
        }
    }
}

// Divide and Conquer algorithm. O(log2n)
function find1DPeak2(arr: number[]): number {
    const middleIndex = Math.floor(arr.length / 2);
    const middleElement = arr[middleIndex];
    if (middleElement < arr[middleIndex - 1]) {
        return find1DPeak2(arr.slice(0, middleIndex));
    } else if (middleElement < arr[middleIndex + 1]) {
        return find1DPeak2(arr.slice(middleIndex + 1));
    } else {
        return middleElement;
    }
}

// Tests
const arrLength = 10000000;
const arrTestFor1DPeak: number[] = new Array(arrLength)
    .fill(null)
    .map((_, idx) => (idx >= (arrLength/2 + 1) ? (idx - arrLength/2) : idx));



/** Find 2D Peak */

// Divide and Conquer algorithm. O(nlog2m), n - amount of rows; m - amount of columns
function find2DPeak2(arr: number[][]): number {
    const columnLength = arr[0].length;
    if (columnLength === 1) {
        const [val] = getMaxValueFromColumn(arr.map(row => row[x]));
        return val;
    }
    const x = Math.floor(columnLength/2 - 1);
    return compareLeftAndRightColumns(arr, x);

    function compareLeftAndRightColumns(arr, x) {
        const [val, y] = getMaxValueFromColumn(arr.map(row => row[x]));
        if (arr[y][x-1] > val) {
            return compareLeftAndRightColumns(arr, x-1);
        } else if (arr[y][x+1] > val) {
            return compareLeftAndRightColumns(arr, x+1);
        } else {
            if (val >= arr[y][x-1] && val >= arr[y][x+1]) {
                console.log(x,y)
                return val
            }
            return val
        }
    }

    function getMaxValueFromColumn(arr) {
        let val = 0;
        let idx = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > val) {
                val = arr[i];
                idx = i;
            }
        }
        return [val, idx];
    }
}

// Tests

const testArrFor2DPeak = [
    [1,2,3,4,5],
    [14,13,12,4,5],
    [15,16,17,19,5],
    [11,3,9,20,2],
]; // Answer 20 (arr[3][3])

