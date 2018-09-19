module.exports = function solveSudoku(matrix) {
  
  const SQUARES_TEMPLATE = (a, b) => Math.floor(b / 3) + Math.floor(a / 3) * 3;
  const COLUMNS_TEMPLATE = (a, b) => b;
  const ROWS_TEMPLATE = (a, b) => a;

  let size = matrix.length;
  let rows = transform(matrix, ROWS_TEMPLATE);
  let columns = transform(rows, COLUMNS_TEMPLATE);
  let squares = transform(rows, SQUARES_TEMPLATE);
  let solved = 0;
  let posible = [];
  let reducer = (acc, val) => acc.concat(val);

  for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      if(rows[i][j] != 0) {
        continue;
      }

      let count = [i, j];

      for (let index = 1; index <= size; index++) {
        let squareIndex = Math.floor(j / 3) + Math.floor(i / 3) * 3;

        if(!rows[i].includes(index) && !columns[j].includes(index) && !squares[squareIndex].includes(index)) {
          count.push(index);
        } else {
          continue;
        }
      }

      if(count.length == 3) {
        rows[i][j] = count[2];
        columns[j][i] = count[2];
        squares = transform(rows, SQUARES_TEMPLATE);
        solved++;
      } else if (count.length <= 2) {
        return false;
      } else if (count.length > 3) {
        posible.push(count);
      }
    }
    if(i == size-1 && rows.reduce(reducer, []).includes(0) && solved != 0) {
      i = -1;
      solved = 0;
      posible = [];
    } else if (i == size-1 && rows.reduce(reducer, []).includes(0) && solved == 0) {
      let x = posible[0][0];
      let y = posible[0][1];
      let variants = posible[0].slice(2);
      for(let index = 0; index < variants.length; index++) {
        rows[x][y] = variants[index];
        let subMatrix = rows;
        let temp = solveSudoku(subMatrix);
        if(temp != false && (typeof temp === 'object' || typeof temp === 'boolean' )) {
          return temp;
        }
      }
    } else if (i == size-1 && !rows.reduce(reducer, []).includes(0)) {
      return rows;
    }
  }
}

function transform (matrix, template) {
  let res = [];

  for(let i = 0; i < matrix.length; i++) {
    res.push([]);
  };

  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[i].length; j++) {
      res[template(i, j)].push(matrix[i][j]);
    }
  }

  return res;
}