import React from 'react';

const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
            (error) => {
                reject(error);
            });
    });
});

// // iterate and log each item
// for (let i = 0; i < rows.length; i++) {
//     var item = rows.item(i);
//     console.log(item);
// }

export const getColorBrandQuery = async (hexColor) => {
    let selectQuery = await ExecuteQuery(`SELECT * FROM books WHERE LOWER(color_hex) = '${hexColor.toLowerCase()}'`,[]);
    const rows = selectQuery.rows;
    if (rows.length > 0) {
        return rows
    } else {
        return null
    }
}



export const getColorNamesQuery = async (hexColor) => {
    let selectQuery = await ExecuteQuery(`SELECT color_name FROM books WHERE LOWER(color_hex) = '${hexColor.toLowerCase()}'`,[]);
    let rows = selectQuery.rows;
    if (rows.length > 0) {
        let nameArray = []
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            nameArray.push(item.color_name)
        }
        // console.log('======= name array =========')
        // console.log(nameArray)
        return nameArray
    } else {
        return null
    }
}

export const getColorBooksForColorQuery = async (hexColor) => {
    let selectQuery = await ExecuteQuery(`SELECT * FROM books WHERE LOWER(color_hex) = '${hexColor.toLowerCase()}'`,[]);
    let rows = selectQuery.rows;
    if (rows.length > 0) {
        let nameArray = []
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            nameArray.push(item)
        }
        // console.log('======= name array =========')
        // console.log(nameArray)
        return nameArray
    } else {
        return null
    }
}

