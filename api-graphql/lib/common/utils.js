
/**  
 * isEmpty: check the falsiness of the any value
 * 
 * This is an utility  method which returns true when the input value is  falsy
 * falsy means any of the following values (false, 0, "", '', null, undefined, [])
 * 
 * @param   {any|mixed}  val value to be tested 
 * @returns {boolean} Returns true if the value is falsy, otherwise returns false
*/
const isEmpty = (val) => {	
	try {

		if(val==null) return true;
	
		switch(typeof(val)){
		
			case 'number':
				return (val==0);
			
			case 'boolean':
				return (val==false);
			
			case 'string':
				if (val=="" || val.match(/^\s*$/) ) return true;
				else return false;
			
			case 'object':
				return (val.length==0 );
			
			case 'function':
				return false;
			
			case 'undefined':
				return true;
		}

	}catch(e){
        console.log(e);
		return true;
	}	
}

module.exports = isEmpty; 