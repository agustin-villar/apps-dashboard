/* TODO document methods, nice to have unit tests for these methods */

// eslint-disable-next-line max-len
const removeDuplicatesFromArray = (sourceArray = []) => sourceArray.filter((item, index) => sourceArray.indexOf(item) === index);

const merge = (leftArray, rightArray, criteria) => {
    const sorted = [];

    while (leftArray.length > 0 && rightArray.length > 0) {
        const { [criteria]: leftCriteria } = leftArray[0];
        const { [criteria]: rightCriteria } = rightArray[0];

        if (leftCriteria < rightCriteria) {
            sorted.push(rightArray[0]);
            rightArray.shift();
        } else {
            sorted.push(leftArray[0]);
            leftArray.shift();
        }
    }

    // if left list has items, add what is left to the results
    while (leftArray.length !== 0) {
        sorted.push(leftArray[0]);
        leftArray.shift();
    }

    // if right list has items, add what is left to the results
    while (rightArray.length !== 0) {
        sorted.push(rightArray[0]);
        rightArray.shift();
    }

    return sorted;
};

const mergeSort = (arr, criteria) => {
    const len = arr.length;
    // an array of length == 1 is technically a sorted list
    if (len === 1) {
        return arr;
    }

    // get pivot
    const middleIndex = Math.ceil(len / 2);

    // split current list into two: left and right list
    let leftArray = arr.slice(0, middleIndex);
    let rightArray = arr.slice(middleIndex, len);

    leftArray = mergeSort(leftArray, criteria);
    rightArray = mergeSort(rightArray, criteria);

    return merge(leftArray, rightArray, criteria);
};

export { removeDuplicatesFromArray, mergeSort };
