const mariadb = require('mariadb');
const { DB_DATABASE, 
        DB_HOST, DB_PASSWORD, 
        DB_USER} = require("../config.js");

const pool = mariadb.createPool({
    host: DB_HOST, 
    user: DB_USER, 
    password: DB_PASSWORD , 
    database: DB_DATABASE, 
    dateStrings: "date",
    connectionLimit: 2
});

//TRAER LA BASE DE DATOS
const getReview = async () => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM review");

    return rows;
    } catch(error){
        console.log("Error al obtener la lista de review:", error);
    } finally {
      if (conn) conn.release(); 
    }
    return false
};

//TRAER LA BASE DE DATOS POR UN ID
const getReviewByID = async(id) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM review WHERE id=?", [id]);

    return rows[0]
    } catch(error){
      console.log(error)
    } finally {
      if (conn) conn.release(); 
    }
    return false
}

//AGREGAR UN ELEMENTO A LA BASE DE DATOS
const createReview = async(review) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO review(title, subTitle, author, type, subType, etiqueta, status, translationStatus, chapters, startDate, finalDate, description, myReview, gender, genderScore, mainCharacter, portada) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [review.title, review.subTitle, review.author, review.type, review.subType, review.etiqueta, review.status, review.translationStatus, review.chapters, review.startDate, review.finalDate, review.description, review.myReview, review.gender, review.genderScore, review.mainCharacter, review.portada]);
  
    return {id: parseInt(response.insertId), ...review};
    } catch(error){
      console.log(error)
    } finally {
      if (conn) conn.release(); 
    }
    return false
}

//ACTUALIZAR DATOS DE UNA BASE DE DATOS
const updateReview = async(id, review) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
      `UPDATE review SET etiqueta=?, updated_at=CURRENT_TIMESTAMP, status=?, translationStatus=?, chapters=?, finalDate=?, myReview=?, genderScore=?, mainCharacter=?, portada=? WHERE id=?`, 
    [review.etiqueta, review.status, review.translationStatus, review.chapters, review.finalDate, review.myReview, review.genderScore, review.mainCharacter, review.portada, id]);
  
    return{id: id, ...review};
    } catch(error){
      console.log(error)
    } finally {
      if (conn) conn.release(); 
    }
    return false
}

//ELIMINAR UN DATO DE UNA BASE DE DATOS
const deleteReview = async(id) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(`DELETE FROM review WHERE id=?`, 
    [id]);
  
    return true
    } catch(error){
      console.log(error)
    } finally {
      if (conn) conn.release(); 
    }
    return false
};


module.exports = {
    getReview,
    getReviewByID,
    createReview,
    updateReview,
    deleteReview
}