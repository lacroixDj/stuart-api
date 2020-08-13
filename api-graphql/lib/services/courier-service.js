// Requiring cutom utils methods
const isEmpty = require("../common/utils"); 

// Requiring the static couriers data from a Json file
let courriers_data = require('../data/couriers-sample-data.json'); 

/** 
 * CouriersService class
 * This class encapsulates the CouriersService methods
 * in roder to keep Isolated the business logic from the API facade
 * 
 * @author Frank Lacroix <lacroixdj@gmail.com.com>
*/
class CouriersService {
    
    /**  
     * couriersService class constructor 
     * Initialize attribute couriers  
    */
    constructor(){
        this.couriers = courriers_data;
    }

    
    /**  
     * Get all courriers in the DB 
     *  
     * @returns {Promise <Array <Courrier>>} A Promise chain with the Array of courriers 
     * @throws  {error}  it will a reject the promise if something goes wrong
    */
    getAllCouriers() {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.couriers);    
            } catch (error) {
                console.log(error);
                reject(error); 
            }            
        });
    }

    
    /**  
     * Gets / retrieves a courier from the DB by the given id 
     *  
     * @param   {integer}  id Courier Id(integer)
     * @returns {Promise <Array <Courrier>>} A Promise chain with the Array of courriers 
     * @throws  {error}  it will a reject the promise if something goes wrong
    */
    getCourierById(id) {
        return new Promise((resolve, reject) => {
            try {
                let courier_idx = this.couriers.findIndex((courier) => courier.id == id);
                if(courier_idx < 0) throw `ERROR! - Courier id ${id} not found`;
                resolve(this.couriers[courier_idx]);
            } catch (error) {
                console.log(error);
                reject(error);  
            }       
        });
    }
    
     
    /**  
     * Get all courriers filtering by courier.capacity >=  capacity_required 
     * 
     * @param   {integer}  capacity_required capacity required expresed in integers (lts.) 
     * @returns {Promise <Array <Courrier>>} A Promise chain with the Array of courriers 
     * @throws  {error}  it will a reject the promise if something goes wrong
    */
    getAllCouriersByCapacity(capacity_required) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.couriers.filter(courrier => courrier.max_capacity >= capacity_required));
            } catch (error) {
                console.log(error);
                reject(error);  
            }          
        });
    }

    
    /**  
     * Get all courriers filtering by courier.capacity >=  capacity_required 
     * and proximity to an specific position 
     * 
     * @param   {integer}  capacity_required capacity required expresed in liters (integer) 
     * @param   {object}   position geographic position expresed in GSM coordinates {lat: float, lng: float} 
     * @param   {integer}  radius proximity radius to search on expresed in meters (integer) 
     * @returns {Promise <Array <Courrier>>} A Promise chain with the Array of courriers 
     * @throws  {error}  it will a reject the promise if something goes wrong 
    */
    getCouriersByCapacityAndProximity(capacity_required, position, radius){
        return new Promise((resolve, reject) => {
            try {
                resolve(this.couriers.filter(courrier => courrier.max_capacity >= capacity_required));
            } catch (error) {
                console.log(error);
                reject(error);  
            }          
        });  
    }

    
    /**  
     * Sets / updates the courier capacity by given params
     * 
     * @param   {integer}  id Courier Id(integer) 
     * @param   {integer}  max_capacity Capacity expresed in liters (integer) 
     * @returns {Promise <Object <Courrier>>} A Promise chain with the updated courier 
     * @throws  {error}  it will a reject the promise if something goes wrong 
    */
    setCapacity(id,  max_capacity){
        return new Promise((resolve, reject) => {
            try {
                let courier_idx = this.couriers.findIndex((courier) => courier.id == id);
                if(courier_idx < 0) throw `ERROR! - Courier id ${id} not found`;
                if(!this.validateCapacityParam(max_capacity)) throw `ERROR! - max_capacity must be a valid integer`;
                let capacity = parseInt(max_capacity);
                
                this.couriers[courier_idx].max_capacity = capacity;
                resolve(this.couriers[courier_idx]);
            } catch (error) {
                console.log(error);
                reject(error);  
            }       
        });
    }

    
    /**  
     *  Adds / increases the courier capacity by given params
     * 
     * @param   {integer}  id Courier Id(integer) 
     * @param   {integer}  max_capacity Capacity expresed in liters (integer) 
     * @returns {Promise <Object <Courrier>>} A Promise chain with the updated courier 
     * @throws  {error}  it will a reject the promise if something goes wrong 
    */
    addCapacity(id,  max_capacity){
        return new Promise((resolve, reject) => {
            try {
                let courier_idx = this.couriers.findIndex((courier) => courier.id == id);
                if(courier_idx < 0) throw `ERROR! - Courier id ${id} not found`;
                if(!this.validateCapacityParam(max_capacity)) throw `ERROR! - max_capacity must be a valid integer`;
                let capacity = parseInt(max_capacity);
                
                this.couriers[courier_idx].max_capacity += Math.abs(capacity);
                resolve(this.couriers[courier_idx]);
            } catch (error) {
                console.log(error);
                reject(error);  
            }
        }); 
    }


    /**  
     *  Removes / decreases the courier capacity by given params
     * 
     * @param   {int}  id Courier Id(integer) 
     * @param   {integer}  max_capacity Capacity expresed in liters (integer) 
     * @returns {Promise <Object <Courrier>>} A Promise chain with the updated courier 
     * @throws  {error}  it will a reject the promise if something goes wrong 
    */
    removeCapacity(id,  max_capacity){
        return new Promise((resolve, reject) => {
            try {
                let courier_idx = this.couriers.findIndex((courier) => courier.id == id);
                if(courier_idx < 0) throw `ERROR! - Courier id ${id} not found`;
                if(!this.validateCapacityParam(max_capacity)) throw `ERROR! - max_capacity must be a valid integer`;
                let capacity = parseInt(max_capacity);
                
                this.couriers[courier_idx].max_capacity -= Math.abs(capacity);
                resolve(this.couriers[courier_idx]);
            } catch (error) {
                console.log(error);
                reject(error);  
            } 
        });
    }


    /**  
     *  Creates / inserts a new courier in the DB
     * 
     * @param   {Object}   courier courier input object 
     * @returns {Promise <Object <Courrier>>} A Promise chain with the created courier 
     * @throws  {error}  it will a reject the promise if something goes wrong 
    */
    createCourier(courier){
        return new Promise((resolve, reject) => {
            try {
                if(!this.validateCourierParam(courier)) throw `ERROR! - Invalid courier input`;
                
                let id = this.couriers.length;
                let newCourier = courier;
                newCourier['id'] = id + 1;
                this.couriers.push(newCourier);            
                resolve(this.couriers[id]);
            } catch (error) {
                console.log(error);
                reject(error);  
            } 
        });
    }


    /**  
     *  Updates the given courier in the DB
     * 
     * @param   {Object}  new_courier courier input object 
     * @returns {Promise <Object <Courrier>>} A Promise chain with the updated courier 
     * @throws  {error}  it will a reject the promise if something goes wrong 
    */
    updateCourier(id, new_courier){
        return new Promise((resolve, reject) => {
            try {
                if(isEmpty(id) || !this.validateCourierParam(new_courier)) throw `ERROR! - Invalid courier input`;
                let courier_idx = this.couriers.findIndex((old_courier) => old_courier.id == id);
                if(courier_idx < 0) throw `ERROR! - Courier id ${id} not found`;
                
                new_courier["id"] = id;
                this.couriers[courier_idx] = new_courier;
                resolve(this.couriers[courier_idx]);
            } catch (error) {
                console.log(error);
                reject(error);  
            }
        }); 
    }


    /**  
     *  Deletes the courier from the DB by the given id
     * 
     * @param   {integer}   id Courier Id(integer) 
     * @returns {Promise <Object <TransactionResponse>>} A Promise chain with the Transaction Response object 
     * @throws  {error}  it will a reject the promise if something goes wrong 
    */
    deleteCourier(id){
        return new Promise((resolve, reject) => {
            try {
                if(isEmpty(id)) throw `ERROR! - Invalid id input`;
                let courier_idx = this.couriers.findIndex((courier) => courier.id == id);
                if(courier_idx < 0) throw `ERROR! - Courier id ${id} not found`;
                
                let courier = this.couriers[courier_idx]; 
                this.couriers.splice(courier_idx, 1);
                const transactionResponse = {
                    status: 200,
                    message: `SUCCESS! - The courier with the id: ${id} - ${courier.firstName} ${courier.lastName}  was deleted!`
                }
                resolve(transactionResponse);
            } catch (error) {
                console.log(error);
                reject(error);  
            } 
        });
    }
    
    
    /**  
     *  Validates Courier input object
     * 
     * @param   {object <Courier>}  courier Courier input object 
     * @returns {boolean} true if the param is valid, otherwise returns false 
    */
    validateCourierParam(courier){
        return (isEmpty(courier) || isEmpty(courier.firstName) || isEmpty(courier.lastName) || isEmpty(courier.email) || !this.validateCapacityParam(courier.max_capacity))? false : true; 
    }

    
    /**  
     *  Validates max_capacity input param
     * 
     * @param   {integer}  max_capacity max_capacity input param 
     * @returns {boolean} true if the param is valid, otherwise returns false 
    */
    validateCapacityParam(max_capacity){
        let capacity = parseInt(max_capacity);
        return ((isEmpty(capacity) && capacity!==0) || isNaN(capacity))? false : true; 
    }
}

// Exporting the class 
module.exports = CouriersService; 