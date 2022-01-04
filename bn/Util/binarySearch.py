def binary_search(arr, low, high, target, constrain):
 
    # Check base case
    if high >= low:
 
        mid = (high + low) // 2
 
        # If element is present at the middle itself
        if arr[mid][constrain] == target:
            return mid
 
        # If element is smaller than mid, then it can only
        # be present in left subarray
        elif arr[mid][constrain] > target:
            return binary_search(arr, low, mid - 1, target, constrain)
 
        # Else the element can only be present in right subarray
        else:
            return binary_search(arr, mid + 1, high, target, constrain)
 
    else:
        # Element is not present in the array
        return -1