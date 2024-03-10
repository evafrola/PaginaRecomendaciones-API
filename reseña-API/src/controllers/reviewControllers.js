const reviewModel = require("../models/reviewModels");
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const getReview = async(req, res) => {
    const review = await reviewModel.getReview();
    res.json(review);
}

const getReviewByID = async(req, res) => {
    const id = parseInt(req.params.id);
    const reviewID = await reviewModel.getReviewByID(id);
    if (reviewID) {
        res.json(reviewID);
    } else {
        res.status(404).json({message: "No se encontró la reseña en la base de datos"});
    }
}

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]; // Extrae el token del encabezado
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        next();
    } catch (error) {
        res.status(401).json({ message: "Usuario no autorizado" });
    }
};

const createReview = async(req, res) => {
    const createdReview = await reviewModel.createReview(req.body);
    if (createdReview) {
        res.json(createdReview)
    } else {
        res.status(500).json({message: "No se pudo agregar la reseña en la base de datos"});
    }
};

const updateReview = async(req, res) => {
    const id = parseInt(req.params.id);
    const reviewID = await reviewModel.getReviewByID(id);
    if (reviewID) {
        const updatedReview = await reviewModel.updateReview(parseInt(req.params.id), {
            ...reviewID,
            ...req.body 
         });
 
         if (updatedReview) {
             res.json(updatedReview);
         } else {
             res.status(500).json({message: "No se pudo actualizar la base de datos"});
         }
     } else {
         res.status(404).json({message: "Reseña no encontrada"});
     }
};

const deleteReview = async (req, res) => {
    const id = parseInt(req.params.id);
    const reviewID = await reviewModel.getReviewByID(id);
    if (reviewID) {
        const result = await reviewModel.deleteReview(parseInt(req.params.id));

        if (result) {
            res.json({message: "Reseña eliminada con éxito"})
        } else {
            res.status(500).json({message: "No se pudo eliminar de la base de datos"});
        }
    } else {
        res.status(404).json({ message: "Reseña no encontrada" });
    }   
};

module.exports = {
    getReview,
    getReviewByID,
    verifyToken,
    createReview,
    updateReview,
    deleteReview
}