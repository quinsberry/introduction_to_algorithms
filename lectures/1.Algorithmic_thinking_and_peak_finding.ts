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
    throw new Error('There is not peak');
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


// Straightforward algorithm. O(n*m), n - amount of rows; m - amount of columns
function find2DPeak1(arr: number[][]): number {
    const startIdx = Math.floor(arr.length/2 - 1);
    const [val, idx] = getMaxValueFromArr(arr[startIdx]);
    return compare(arr, val, idx, null);

    function compare(arr: number[][], val: number, x: number, y: null): number
    function compare(arr: number[][], val: number, x: null, y: number): number
    function compare(arr: number[][], val: number, x: number | null, y: number | null): number {
        if (x != null) {
            const [colVal, idx] = getMaxValueFromArr(arr.map(row => row[x]));
            return val === colVal ? val : compare(arr, colVal, null, idx);
        } else if (y != null) {
            const [rowVal, idx] = getMaxValueFromArr(arr[y]);
            return val === rowVal ? val : compare(arr, rowVal, idx, null);
        } else {
            throw new Error('One of the arguments: x or y should not be null');
        }
    }

    function getMaxValueFromArr(arr: number[]): [number, number] {
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

// Divide and Conquer algorithm. O(nlog2m), n - amount of rows; m - amount of columns
function find2DPeak2(arr: number[][]): number {
    const columnLength = arr[0].length;
    if (columnLength === 1) {
        const [val] = getMaxValueFromColumn(arr.map(row => row[x]));
        return val;
    }
    const x = Math.floor(columnLength/2 - 1);
    return compareLeftAndRightColumns(arr, x);

    function compareLeftAndRightColumns(arr: number[][], x: number): number {
        const [val, y] = getMaxValueFromColumn(arr.map(row => row[x]));
        if (arr[y][x-1] > val) {
            return compareLeftAndRightColumns(arr, x-1);
        } else if (arr[y][x+1] > val) {
            return compareLeftAndRightColumns(arr, x+1);
        } else {
            if (val >= arr[y][x-1] && val >= arr[y][x+1]) {
                return val;
            }
            return val;
        }
    }

    function getMaxValueFromColumn(arr: number[]): [number, number] {
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

const testArrFor2DPeak1 = [
    [10, 8, 10, 10],
    [14, 13, 12, 11],
    [15, 9, 11, 21],
    [16, 17, 19, 20],
]; // Answer 21

const testArrFor2DPeak2 = [
    [1,2,3,4,5],
    [14,13,12,4,5],
    [15,16,17,19,5],
    [11,3,9,20,2],
]; // Answer 20

