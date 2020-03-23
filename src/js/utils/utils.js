/**
 * @param  {[*]} sourceArray - Array to remove duplicates from
 * @return {[*]} An array without duplicated elements
 */
// eslint-disable-next-line max-len
const removeDuplicatesFromArray = (sourceArray = []) => sourceArray.filter((item, index) => sourceArray.indexOf(item) === index);

/**
 * @param  {[Object]} leftArray - leftArray to be merged.
 * @param  {[Object]} rightArray - rightArray to be merged.
 * @param  {String} criteria - key name of the property used to sort the arrays.
 * @return {[Object]} an array merging the left and right arrays.
 */
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

    // if it still has items, add what's left from the left array to the results.
    while (leftArray.length !== 0) {
        sorted.push(leftArray[0]);
        leftArray.shift();
    }

    // if it still has items, add what's left from the right array to the results.
    while (rightArray.length !== 0) {
        sorted.push(rightArray[0]);
        rightArray.shift();
    }

    return sorted;
};

/**
 * Based on: https://humanwhocodes.com/blog/2012/10/02/computer-science-and-javascript-merge-sort/
 * and: https://dev.to/wangonya/sorting-algorithms-with-javascript-part-1-4aca
 * @param  {[Object]} arr - Array to be sorted
 * @param  {String} criteria - key identifying the criteria by which the array of objects is being sorted.
 * @return {[Object]} An array of objects ordered from the highest to  the lowest value of the criteria.
 */
const mergeSort = (arr, criteria) => {
    const arrLength = arr.length;
    if (arrLength === 1) {
        return arr;
    }

    // find the middle index of the array
    const middleIndex = Math.ceil(arrLength / 2);

    // Split the array in two parts
    let leftArray = arr.slice(0, middleIndex);
    let rightArray = arr.slice(middleIndex, arrLength);

    leftArray = mergeSort(leftArray, criteria);
    rightArray = mergeSort(rightArray, criteria);

    return merge(leftArray, rightArray, criteria);
};

export { removeDuplicatesFromArray, mergeSort };
