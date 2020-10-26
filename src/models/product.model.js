import {IMG_ENDPOINT} from '../../apiEndpoint';

class Product {
    constructor(id, userId, username, fisheryName, fishName, fishCategory, price, unit, image, location, contact, availableTill, description, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.fishName = fishName;
        this.fisheryName = fisheryName;
        this.fishCategory = fishCategory;
        this.price = price;
        this.unit = unit;
        this.availableTill = availableTill;
        this.image = `${IMG_ENDPOINT}` + image;
        this.location = location;
        this.contact = contact;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }
}

export default Product;