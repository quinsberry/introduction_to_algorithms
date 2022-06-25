/**
 * Peak finding:
 * In an array of numbers can be just one peak.
 * */

/* Straightforward algorithm. O(n)*/
function find1DPeak1(arr: number[]): number {
    for (let i = 0; i < arr.length; i++) {
        if (i !== 0 && i !== arr.length && (arr[i] > arr[i - 1] && arr[i] > arr[i + 1])) {
            return arr[i];
        }
    }
}

/* Divide and Conquer algorithm O(log2n) */
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
