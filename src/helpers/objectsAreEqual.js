function objectsAreEqual(value, other) {
    // Get the value type
    let type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if ( type !== Object.prototype.toString.call(other) ) return false;

    // If items are not an object or array, return false
    if ( ['[object Array]', '[object Object]'].indexOf(type) < 0 ) return false;

    // Compare the length of the length of the two items
    let valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    let otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if ( valueLen !== otherLen ) return false;

    // Compare two items
    function compare(item1, item2) {

        // Get the object type
        let itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if ( ['[object Array]', '[object Object]'].indexOf(itemType) >= 0 ) {
            if ( !objectsAreEqual(item1, item2) ) return false;
        }

        // Otherwise, do a simple comparison
        else {
            // If the two items are not the same type, return false
            if ( itemType !== Object.prototype.toString.call(item2) ) return false;

            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if ( itemType === '[object Function]' ) {
                if ( item1.toString() !== item2.toString() ) return false;
            } else {
                if ( item1 !== item2 ) return false;
            }

        }
    }

    // Compare properties
    if ( type === '[object Array]' ) {
        for (let i = 0; i < valueLen; i++) {
            if ( compare(value[i], other[i]) === false ) return false;
        }
    } else {
        for (let key in value) {
            if ( value.hasOwnProperty(key) ) {
                if ( compare(value[key], other[key]) === false ) return false;
            }
        }
    }

    // If nothing failed, return true
    return true;
}

export default objectsAreEqual;