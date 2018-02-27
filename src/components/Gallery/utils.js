export function round(value, decimals) {
  if (!decimals) decimals = 0;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// return two decimal places rounded number
export function ratio({ width, height }) {
  return round(width / height, 2);
}

// takes the Gallery's photos prop object, width of the container,
// margin between photos Gallery prop, and columns Gallery prop.
// calculates, sizes based on columns and returns the photos object with new height/width props
export function computeSizes({ photos, columns, width, margin }) {
  if (!width) {
    return [];
  }
  // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
  const rows = photos.reduce((acc, cell, idx) => {
    const row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [...acc[row], cell] : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);

  console.log('photos reduce into rows: ', rows)
  // at this point we could iterate through the array and compare the image formats, and potentially push the last image into the next row.

  // how would you push items around in the array
  /*
  const rowsLandscapeSorted = rows.map((row, rowIndex) => {
    const newRow = row.map(column, columnIndex)
    // we only deal with columns in the last row, so if a row only had 3 columns, the height will be caculated based on the items in the row
  })
  */


  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.
  const lastRowIndex = rows.length - 1;
  const rowsWithSizes = rows.map((row, rowIndex) => {
    const totalRatio = row.reduce((result, photo) => result + ratio(photo), 0); // adds the ratios of each photo to a total ratio
    const rowWidth = width - row.length * (margin * 2); // minus the margins

    //console.log('totalRatio:', totalRatio, ' rowWidth: ', rowWidth)
    // assign height, but let height of a single photo in the last
    // row not expand across columns so divide by columns
    /*
    const height = (rowIndex !== lastRowIndex || row.length > 2) // eslint-disable-line
        ? rowWidth / totalRatio
        : rowWidth / row.length / totalRatio;
    */

    let height
    if (rowIndex !== lastRowIndex) {
      height = rowWidth / totalRatio
    } else {
      if (row.length === 1) {
        height = rowWidth / columns / totalRatio
      } else if (row.length > (columns - 1)) { // this works if 3 is 1 short of a full column, but what if we have more columns?
        height = rowWidth / row.length / totalRatio
      } else {
        height = rowWidth / columns - row.length / totalRatio
      }
    }

    // row.length was columns, that would give you exactly the original ratio if there were X more images of the same ratio. Here we say there are

    // if not the last row or the row is longer then 1.
    // let's try setting that two 2, using display inline-block
    // and setting the text align to center.

    return row.map(photo => ({
      ...photo,
      height: round(height, 1),
      width: round(height * ratio(photo), 1),
    }));
  });
  //debugger;
  //console.log('rowsWithSizes: ', rowsWithSizes)
  return rowsWithSizes.reduce((acc, row) => [...acc, ...row], []);
}
