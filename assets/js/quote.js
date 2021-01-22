/* javascript for quote form */

function buildingType(){ // selects the type of building ,saves into variable for use by other fns
    return document.getElementById('building-type').value;
    //return type;
    }


// just shows/hides div elements based on drop down menu selection	
function display_forms (){
    if (buildingType()==='residential'){
        document.getElementById('number-of-corporations').style.display='none';
        document.getElementById('number-of-parking-spots').style.display='none';
        document.getElementById('number-of-elevators').style.display='none';
        document.getElementById('number-of-companies').style.display='none';
        document.getElementById('maximum-occupancy').style.display='none';
        document.getElementById('business-hours').style.display='none';
        document.getElementById('number-of-floors').style.display='block';
        document.getElementById('number-of-apartments').style.display='block';
        document.getElementById('number-of-basements').style.display='block';
    }
    else if (buildingType()==='commercial'){
        //alert('testing');
        document.getElementById('number-of-corporations').style.display='none';
        document.getElementById('number-of-parking-spots').style.display='block';
        document.getElementById('number-of-elevators').style.display='block';
        document.getElementById('number-of-companies').style.display='block';
        document.getElementById('maximum-occupancy').style.display='none';
        document.getElementById('business-hours').style.display='none';
        document.getElementById('number-of-floors').style.display='block';
        document.getElementById('number-of-apartments').style.display='none';
        document.getElementById('number-of-basements').style.display='block';
    }
    else if (buildingType()==='corporate'){
        document.getElementById('number-of-corporations').style.display='block';
        document.getElementById('number-of-parking-spots').style.display='block';
        document.getElementById('number-of-elevators').style.display='none';
        document.getElementById('number-of-companies').style.display='none';
        document.getElementById('maximum-occupancy').style.display='block';
        document.getElementById('business-hours').style.display='none';
        document.getElementById('number-of-floors').style.display='block';
        document.getElementById('number-of-apartments').style.display='none';
        document.getElementById('number-of-basements').style.display='block';
    }
     else if (buildingType()==='hybrid'){
        document.getElementById('number-of-corporations').style.display='none';
        document.getElementById('number-of-parking-spots').style.display='block';
        document.getElementById('number-of-elevators').style.display='none';
        document.getElementById('number-of-companies').style.display='block';
        document.getElementById('maximum-occupancy').style.display='block';
        document.getElementById('business-hours').style.display='block';
        document.getElementById('number-of-floors').style.display='block';
        document.getElementById('number-of-apartments').style.display='none';
        document.getElementById('number-of-basements').style.display='block';
    }

}


// next functions grab and return the value from the inputs for the calculator
function apts(){ 
    return document.getElementById('apts').value;
    //console.log(apts);
    }

function floors(){
     return document.getElementById('floors').value;
    console.log(floors);
    //alert(floors);
    }

function basements(){
    return document.getElementById('basements').value;
    //console.log(basements);
    }

function biz(){
    return document.getElementById('biz').value;
    }

function park(){
    return document.getElementById('park').value;
    }

function com_shafts(){
    return document.getElementById('com_shafts').value;
    }

function tenants(){
    return document.getElementById('tenants').value;
}

function occupants(){
    return document.getElementById('occupants').value;
}
function business_hours(){
    return document.getElementById('hours').value;
}

//next 2 functions calculate the residential shafts
function resElNumbers(){
    return apts()/floors();
    //console.log(resElNumbers);
    }
            
function res_shafts(){
    var total = Math.ceil((apts()/floors())/6) * Math.ceil(floors()/20);
    return total;
    }

//parseFloat (or int) is necessary or else the results will append, not add!!
// calculates # of corporate or hybrid shafts needed

function corp_hyb_shafts(){
    var occ = occupants() * (parseFloat(floors()) + parseFloat(basements()));
    var shafts = occ/1000;
    var columns = Math.round((parseFloat(floors()) + parseFloat(basements()))   / 20);
    var el_per_column = Math.ceil(shafts / columns);
    var total = el_per_column * columns;
    return Math.round(total);
}
    
// returns # of elevators needed, for the auto-updating form fields
function num_elevators(){
    if (buildingType()==='residential'){
        return res_shafts();
    }
    else if (buildingType()==='commercial'){
        return com_shafts();
    }
    else if (buildingType()==='corporate' || buildingType()==='hybrid'){
        return corp_hyb_shafts();
    }

}

//next group of functions calculate the various costs
    var standard = 7565;
    var standardFee = 1.10;
    var premium = 12345;
    var premiumFee = 1.13;
    var excelium = 15400;
    var exceliumFee = 1.16
//returns cost per elevator
function el_price(){
    if(document.getElementById('standard').checked){
        return '\t$'+ standard.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
        
    else if (document.getElementById('premium').checked){
        return '\t$'+ premium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
        
    else if (document.getElementById('excelium').checked){
        return '\t$'+ excelium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
    }

// calculates cost before installation fees
function el_costs(){
    if (buildingType()==='residential'){
        if(document.getElementById('standard').checked){
            return '\t$'+ (((res_shafts() * standard ))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        
        else if (document.getElementById('premium').checked){
            return '\t$'+ ((res_shafts() * premium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        
        else if (document.getElementById('excelium').checked){
            return '\t$'+ ((res_shafts() * excelium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }

    else if (buildingType()==='commercial'){
        if(document.getElementById('standard').checked){
            return '\t$'+ (((com_shafts() * standard ))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('premium').checked){
            return'\t$'+ ((com_shafts() * premium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('excelium').checked){
            return '\t$'+ ((com_shafts() * excelium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }
        
    else if (buildingType()==='corporate' || buildingType()==='hybrid'){
        if(document.getElementById('standard').checked){
            return'\t$'+ (((corp_hyb_shafts() * standard ))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('premium').checked){
            return'\t$'+ ((corp_hyb_shafts() * premium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('excelium').checked){
            return'\t$'+ ((corp_hyb_shafts() * excelium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }

    
}
// calculates just the installtion fee
function install_fee_display(){
    if (buildingType()==='residential'){
        if(document.getElementById('standard').checked){
            return '\t$'+ (((res_shafts() * standard * standardFee))-((res_shafts() * standard ))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        
        else if (document.getElementById('premium').checked){
            return '\t$'+ (((res_shafts() * premium * premiumFee))- ((res_shafts() * premium ))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        
        else if (document.getElementById('excelium').checked){
            return '\t$'+ (((res_shafts() * excelium * exceliumFee))-(res_shafts() * excelium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }

    else if (buildingType()==='commercial'){
        if(document.getElementById('standard').checked){
            return '\t$'+ (((com_shafts() * standard * standardFee))-((com_shafts() * standard ))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('premium').checked){
            return'\t$'+ (((com_shafts() * premium * premiumFee))-(com_shafts() * premium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('excelium').checked){
            return '\t$'+ (((com_shafts() * excelium * exceliumFee))-(com_shafts() * excelium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }
        
    else if (buildingType()==='corporate' || buildingType()==='hybrid'){
        if(document.getElementById('standard').checked){
            return'\t$'+ (((corp_hyb_shafts() * standard * standardFee))-((corp_hyb_shafts() * standard ))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('premium').checked){
            return'\t$'+ (((corp_hyb_shafts() * premium * premiumFee))-(corp_hyb_shafts() * premium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('excelium').checked){
            return'\t$'+ (((corp_hyb_shafts() * excelium * exceliumFee))-(corp_hyb_shafts() * excelium )).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }

}

// calculates the final price
function display_service_cost(){
    
    if (buildingType()==='residential'){
        if(document.getElementById('standard').checked){
            return '\t$'+ (((res_shafts() * standard * standardFee))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        
        else if (document.getElementById('premium').checked){
            return '\t$'+ ((res_shafts() * premium * premiumFee)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        
        else if (document.getElementById('excelium').checked){
            return '\t$'+ ((res_shafts() * excelium * exceliumFee)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }

    else if (buildingType()==='commercial'){
        if(document.getElementById('standard').checked){
            return '\t$'+ (((com_shafts() * standard * standardFee))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('premium').checked){
            return'\t$'+ ((com_shafts() * premium * premiumFee)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('excelium').checked){
            return '\t$'+ ((com_shafts() * excelium * exceliumFee)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }
        
    else if (buildingType()==='corporate' || buildingType()==='hybrid'){
        if(document.getElementById('standard').checked){
            return'\t$'+ (((corp_hyb_shafts() * standard * standardFee))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('premium').checked){
            return'\t$'+ ((corp_hyb_shafts() * premium * premiumFee)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        else if (document.getElementById('excelium').checked){
            return'\t$'+ ((corp_hyb_shafts() * excelium * exceliumFee)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
        }

    
}