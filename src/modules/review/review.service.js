import ApiError from "../../utils/ApiError.utility.js";
import { Product } from "../product/product.model.js";
import {Order} from "../order/order.model.js"
import { Review } from "./review.model.js";

const reviewService = {
    createReviewForUser : async (reviewDatObj , userId , productId) => {
        //only the user who purchase that product can only review the product
        let findTheProduct = await Product.findById(productId);
        
        if(!findTheProduct) throw new ApiError(404 , "Product Not Found");

        //if we got the product then check for Order if we have done any order
        const findTheOrder = await Order.findOne({user : userId , "items.product" : productId});

        if(!findTheOrder) throw new ApiError(400 , "User is Not Authorized to Perform Review");

        // createReview
        const createReview = {
            user : userId,
            product : productId,
            rating : reviewDatObj.rating, 
            comment : reviewDatObj.comment,
        }

        const review = await Review.create(createReview);

        if(!review) throw new ApiError(500 ,"Err Occurred while creating review");

        findTheProduct.reviews.push(review._id); //cause we are storing only objId in the Product
        
        findTheProduct.numOfReviews = findTheProduct.reviews.length;
        
        let sumOfAllReviewRatings = findTheProduct.reviews.reduce( (acc, index) => acc + index.rating , 0 );

        findTheProduct.ratings = sumOfAllReviewRatings / findTheProduct.numOfReviews;

        await findTheProduct.save();
        // now updation done simply return
        return review;
    }
}

export default reviewService;